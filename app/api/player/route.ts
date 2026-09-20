import { NextRequest } from "next/server";

export type PlayerData = {
  nickname: string;
  level: number;
  region: string;
  rank: string | null;
  clan: string | null;
  created: string | null;
  likes: number | null;
  exp: number | null;
  pet: string | null;
  diamondCost: number | null;
  bio: string | null;
  source: string;
};

export type PlayerApiResponse =
  | { ok: true; unofficial: true; data: PlayerData }
  | { ok: false; code: "validation" | "rate_limited" | "not_found" | "unavailable"; error: string; regions: string[] };

const SUPPORTED_REGIONS = ["US", "BR", "IND", "BD", "SG", "PK", "ID", "TH", "VN", "TW", "ME", "RU", "CIS", "NA", "SAC", "EUROPE"];

const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { at: number; res: PlayerApiResponse }>();

const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

const POOL_SIZE = 3;
const PROVIDER_BUDGET_MS = 10_000;
const CHAIN_BUDGET_MS = 20_000;

type Provider = {
  id: string;
  label: string;
  supportsRegion: boolean;
  buildUrl: (uid: string, region: string) => string;
  sequential?: boolean;
  regionOrder?: string[];
};

function buildProviders(): Provider[] {
  const customBase = process.env.FF_API_BASE;
  const key = process.env.SIAM_BHAU_API_KEY?.trim();
  const providers: Provider[] = [];
  if (key) {
    providers.push({
      id: "siambhau",
      label: "SiamBhau FreeFireApi",
      supportsRegion: true,
      sequential: true,
      regionOrder: ["US", "BR", "IND", "BD", "SG", "PK", "ID", "TH", "VN", "TW", "ME", "RU", "CIS", "NA", "SAC", "EUROPE"],
      buildUrl: (uid, region) =>
        `https://siambhau69.eu.cc/freefireinfo/bhau?uid=${uid}&region=${region}&key=${encodeURIComponent(key)}`,
    });
  }
  providers.push(
    {
      id: "free-ff-api",
      label: "free-ff-api (render)",
      supportsRegion: true,
      buildUrl: (uid, region) => `${customBase ?? "https://free-ff-api-src-5plp.onrender.com"}/api/v1/account?region=${region}&uid=${uid}`,
    },
    {
      id: "freefire-api-vercel",
      label: "FreeFire-Api (vercel)",
      supportsRegion: true,
      buildUrl: (uid, region) => `https://freefire-api-six.vercel.app/get_player_personal_show?server=${region.toLowerCase()}&uid=${uid}`,
    },
    {
      id: "freefire-info-api-vercel",
      label: "free-fire-info-api (vercel)",
      supportsRegion: false,
      buildUrl: (uid) => `https://glob-info2.vercel.app/info?uid=${uid}`,
    },
    {
      id: "freefire-zy9l-render",
      label: "Free-Fire-API (render)",
      supportsRegion: true,
      buildUrl: (uid, region) => `https://freefireinfo-zy9l.onrender.com/api/v1/player-profile?uid=${uid}&server=${region}`,
    },
  );
  return providers;
}

type RegionResult =
  | { ok: true; data: PlayerData }
  | { ok: false; code: "not_found" | "unavailable" };

type ProviderResult = { found: PlayerData | null; sawUnavailable: boolean; sawNotFound: boolean };

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0].trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function rateLimited(ip: string): { limited: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { limited: false, retryAfterMs: 0 };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT.max) {
    return { limited: true, retryAfterMs: entry.resetAt - now };
  }
  return { limited: false, retryAfterMs: 0 };
}

const RANK_THRESHOLDS = [
  { name: "Heroico", min: 2200 },
  { name: "Diamante", min: 1900 },
  { name: "Platino", min: 1600 },
  { name: "Oro", min: 1300 },
  { name: "Plata", min: 1100 },
  { name: "Bronce", min: 0 },
];

function rankFromPoints(points: unknown): string | null {
  const n = typeof points === "number" ? points : Number(points);
  if (!Number.isFinite(n)) return null;
  for (const r of RANK_THRESHOLDS) if (n >= r.min) return r.name;
  return null;
}

function dateFromUnix(unix: unknown): string | null {
  const n = Number(unix);
  if (!Number.isFinite(n) || n <= 0) return null;
  const d = new Date(n * 1000);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function num(v: unknown): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function deepExtractPlayer(value: unknown, source: string, regionHint: string): PlayerData | null {
  if (Array.isArray(value)) {
    for (const v of value) {
      const r = deepExtractPlayer(v, source, regionHint);
      if (r) return r;
    }
    return null;
  }
  if (!value || typeof value !== "object") return null;
  const obj = value as Record<string, unknown>;
  const nickname = obj.nickname ?? obj.Nickname ?? obj.playerName;
  if (typeof nickname === "string" && nickname) {
    return {
      nickname,
      level: num(obj.level) ?? 0,
      region: typeof obj.region === "string" ? obj.region : regionHint,
      rank: rankFromPoints(obj.rankingPoints),
      clan: typeof obj.clanName === "string" && obj.clanName ? (obj.clanName as string) : null,
      created: dateFromUnix(obj.createAt),
      likes: num(obj.liked),
      exp: num(obj.exp),
      pet: null,
      diamondCost: null,
      bio: typeof obj.signature === "string" && obj.signature ? (obj.signature as string) : null,
      source,
    };
  }
  for (const v of Object.values(obj)) {
    const r = deepExtractPlayer(v, source, regionHint);
    if (r) return r;
  }
  return null;
}

function parseAccountJson(json: unknown, source: string, regionHint: string): PlayerData | null {
  const root = (json && typeof json === "object" ? json : {}) as Record<string, unknown>;
  const basic = (root.basicInfo && typeof root.basicInfo === "object" ? root.basicInfo : {}) as Record<string, unknown>;
  const nickname = basic.nickname;
  if (typeof nickname === "string" && nickname) {
    const clanObj = root.clanBasicInfo as Record<string, unknown> | undefined;
    const petObj = root.petInfo as Record<string, unknown> | undefined;
    const costObj = root.diamondCostRes as Record<string, unknown> | undefined;
    const socialObj = root.socialInfo as Record<string, unknown> | undefined;
    const clan = clanObj?.clanName;
    const pet = petObj?.name;
    return {
      nickname,
      level: num(basic.level) ?? 0,
      region: typeof basic.region === "string" ? basic.region : regionHint,
      rank: rankFromPoints(basic.rankingPoints),
      clan: typeof clan === "string" && clan ? clan : null,
      created: dateFromUnix(basic.createAt),
      likes: num(basic.liked),
      exp: num(basic.exp),
      pet: typeof pet === "string" && pet ? pet : null,
      diamondCost: num(costObj?.diamondCost),
      bio: typeof socialObj?.signature === "string" && socialObj.signature ? (socialObj.signature as string) : null,
      source,
    };
  }
  return deepExtractPlayer(json, source, regionHint);
}

async function fetchProviderRegion(
  provider: Provider,
  uid: string,
  region: string,
  signal: AbortSignal,
): Promise<RegionResult> {
  try {
    const apiRes = await fetch(provider.buildUrl(uid, region), {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal,
    });
    if (apiRes.status === 404) return { ok: false, code: "not_found" };
    if (!apiRes.ok) return { ok: false, code: "unavailable" };
    const json = (await apiRes.json()) as unknown;
    const player = parseAccountJson(json, provider.label, region);
    if (player) return { ok: true, data: player };
    return { ok: false, code: "unavailable" };
  } catch {
    return { ok: false, code: "unavailable" };
  }
}

async function scanProvider(provider: Provider, uid: string): Promise<ProviderResult> {
  const result: ProviderResult = { found: null, sawUnavailable: false, sawNotFound: false };
  const controller = new AbortController();
  const budget = setTimeout(() => controller.abort(), PROVIDER_BUDGET_MS);

  if (!provider.supportsRegion) {
    const r = await fetchProviderRegion(provider, uid, SUPPORTED_REGIONS[0], controller.signal);
    if (r.ok) result.found = r.data;
    else if (r.code === "unavailable") result.sawUnavailable = true;
    else result.sawNotFound = true;
    clearTimeout(budget);
    return result;
  }

  if (provider.sequential) {
    const order = provider.regionOrder ?? SUPPORTED_REGIONS;
    for (const region of order) {
      if (controller.signal.aborted) break;
      const r = await fetchProviderRegion(provider, uid, region, controller.signal);
      if (r.ok) {
        result.found = r.data;
        break;
      }
      if (r.code === "unavailable") result.sawUnavailable = true;
      else result.sawNotFound = true;
    }
    clearTimeout(budget);
    return result;
  }

  const queue = [...SUPPORTED_REGIONS];
  let idx = 0;
  const workers = Array.from({ length: POOL_SIZE }, async () => {
    while (idx < queue.length && !result.found && !controller.signal.aborted) {
      const region = queue[idx++];
      const r = await fetchProviderRegion(provider, uid, region, controller.signal);
      if (r.ok) {
        result.found = r.data;
        controller.abort();
        break;
      }
      if (r.code === "unavailable") result.sawUnavailable = true;
      else result.sawNotFound = true;
    }
  });

  await Promise.all(workers);
  clearTimeout(budget);
  return result;
}

function notFoundRes(): PlayerApiResponse {
  return {
    ok: false,
    code: "not_found",
    error: "No se encontró el jugador en ninguna región, o las instancias comunitarias no respondieron. Reintentá más tarde.",
    regions: SUPPORTED_REGIONS,
  };
}

function unavailableRes(labels: string[]): PlayerApiResponse {
  return {
    ok: false,
    code: "unavailable",
    error: `Ninguna instancia comunitaria respondió (${labels.join(", ")}). Garena no ofrece API oficial y estos servicios usan cuentas de invitado que se banean seguido. El resultado nunca se inventa; reintentá más tarde.`,
    regions: SUPPORTED_REGIONS,
  };
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimited(ip);
  if (rl.limited) {
    return Response.json(
      {
        ok: false,
        code: "rate_limited",
        error: "Demasiadas consultas desde esta IP en poco tiempo. Esperá unos segundos y volvé a intentar.",
        regions: SUPPORTED_REGIONS,
      } satisfies PlayerApiResponse,
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  const uid = (req.nextUrl.searchParams.get("uid") ?? "").trim();
  const regionParam = (req.nextUrl.searchParams.get("region") ?? "").trim().toUpperCase();
  const autoMode = !regionParam || regionParam === "AUTO" || !SUPPORTED_REGIONS.includes(regionParam);

  if (!/^\d{6,12}$/.test(uid)) {
    return Response.json(
      {
        ok: false,
        code: "validation",
        error: "El ID debe ser un número de 6 a 12 dígitos.",
        regions: SUPPORTED_REGIONS,
      } satisfies PlayerApiResponse,
      { status: 400 },
    );
  }

  const cacheKey = autoMode ? `auto:${uid}` : `${uid}:${regionParam}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return Response.json(cached.res);
  }

  const providers = buildProviders();
  const started = Date.now();
  let sawUnavailable = false;
  let sawNotFound = false;
  let res: PlayerApiResponse | null = null;

  for (const provider of providers) {
    if (Date.now() - started > CHAIN_BUDGET_MS) {
      sawUnavailable = true;
      break;
    }
    const out = await scanProvider(provider, uid);
    if (out.found) {
      res = { ok: true, unofficial: true, data: out.found };
      break;
    }
    if (out.sawUnavailable) sawUnavailable = true;
    if (out.sawNotFound) sawNotFound = true;
  }

  if (!res) {
    if (sawUnavailable || !sawNotFound) {
      res = unavailableRes(providers.map((p) => p.label));
    } else {
      res = notFoundRes();
    }
  }

  cache.set(cacheKey, { at: Date.now(), res });
  return Response.json(res);
}