"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { SimBanner } from "@/components/SimBanner";
import { CountUp } from "@/components/CountUp";
import { PACKETS } from "@/content/packets";
import { randInt, fmt } from "@/lib/utils";
import type { PlayerApiResponse } from "@/app/api/player/route";

const RARITIES = [
  { name: "Común", weight: 62, color: "text-faint", gems: [5, 20] },
  { name: "Rara", weight: 26, color: "text-chill", gems: [25, 60] },
  { name: "Épica", weight: 9, color: "text-radar", gems: [70, 150] },
  { name: "Legendaria", weight: 3, color: "text-warn", gems: [180, 400] },
] as const;

function roll() {
  const total = RARITIES.reduce((a, r) => a + r.weight, 0);
  let n = Math.random() * total;
  for (const r of RARITIES) {
    n -= r.weight;
    if (n <= 0) return r;
  }
  return RARITIES[0];
}

type Pull = { rarity: (typeof RARITIES)[number]; gems: number };

type Ctx =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; name: string; region: string; diamondCost: number | null }
  | { status: "error"; error: string };

export default function SimuladorPage() {
  const [pack, setPack] = useState(PACKETS[2]);
  const [pulls, setPulls] = useState<Pull[]>([]);
  const [round, setRound] = useState(0);
  const [uid, setUid] = useState("");
  const [ctx, setCtx] = useState<Ctx>({ status: "idle" });

  const totalGems = pulls.reduce((a, p) => a + p.gems, 0);

  function open(n: number) {
    const next: Pull[] = [];
    for (let i = 0; i < n; i++) {
      const rarity = roll();
      next.push({ rarity, gems: randInt(rarity.gems[0], rarity.gems[1]) });
    }
    setPulls((prev) => [...next, ...prev].slice(0, 30));
    setRound((r) => r + 1);
  }

  async function fetchCtx(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const id = uid.trim();
    if (!id || ctx.status === "loading") return;
    setCtx({ status: "loading" });
    try {
      const res = await fetch(`/api/player?uid=${encodeURIComponent(id)}`);
      const json = (await res.json()) as PlayerApiResponse;
      if (json.ok) {
        setCtx({ status: "ok", name: json.data.nickname, region: json.data.region, diamondCost: json.data.diamondCost });
      } else {
        setCtx({ status: "error", error: json.error });
      }
    } catch {
      setCtx({ status: "error", error: "No se pudo conectar con el servicio de consulta." });
    }
  }

  return (
    <ToolPage
      path="/herramientas/diamantes/simulador"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Diamantes", href: "/herramientas" },
        { label: "Simulador", href: "/herramientas/diamantes/simulador" },
      ]}
      title="Simulador de apertura de diamantes"
      tag="DIAMANTES N"
      intro="Abrí lotes  y mirá qué 'suerte' tenés. Es puro entretenimiento con probabilidades "
      sim="Este simulador "
      howTo={[
        "Opcional: ingresá tu UID y consultá el contexto real (nombre y diamantes del Sistema Prime) por API.",
        "Elegí un paquete de referencia (solo para ambientar el contador).",
        "Abrí 1 o 10 lotes: cada uno saca una rareza aleatoria.",
        "El contador suma los diamantes ",
        "Compará: el 62% de los resultados son 'comunes', ",
      ]}
      related={[
        { href: "/herramientas/diamantes/calculadora", label: "Calculadora de diamantes", note: "lo que costaría en moneda real" },
        { href: "/guias/comprar-diamantes-oficial", label: "Comprar diamantes oficial", note: "las únicas vías para diamantes de verdad" },
        { href: "/guias/estafas-diamantes-gratis", label: "Detectar ", note: "r" },
      ]}
      softwareName="Simulador de apertura de diamantes (simulación)"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <SimBanner>
          Los lotes, las rarezas y el contador son entretenimiento local: no tocan tu cuenta y no usan dinero. Lo único
          real es el contexto del ID (opcional): nombre y diamantes del Sistema Prime leídos por API.
        </SimBanner>

        <form onSubmit={fetchCtx} className="mt-6">
          <label htmlFor="sim-uid" className="block text-xs uppercase tracking-widest text-faint">
            Contexto real por ID (opcional)
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="sim-uid"
              className="field min-w-0 flex-1"
              placeholder="Tu UID (ej: 482061415)"
              inputMode="numeric"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
            <button type="submit" className="btn btn-ghost sm:w-44 sm:shrink-0" disabled={ctx.status === "loading"}>
              {ctx.status === "loading" ? "Consultando…" : "Consultar contexto"}
            </button>
          </div>
          {ctx.status === "ok" && (
            <p className="mt-3 text-sm text-muted">
              Contexto real: <span className="font-mono font-semibold text-bone">{ctx.name}</span>{" "}
              <span className="tabular text-faint">({ctx.region})</span> · Sistema Prime:{" "}
              <span className="tabular font-semibold text-radar">{ctx.diamondCost ?? "—"} diamantes</span>.{" "}
              <span className="text-faint">Ese número es real (API); los lotes de abajo, no.</span>
            </p>
          )}
          {ctx.status === "error" && <p className="mt-3 text-sm leading-relaxed text-warn">{ctx.error}</p>}
        </form>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pack" className="block text-xs uppercase tracking-widest text-faint">Paquete de referencia</label>
            <select id="pack" className="field mt-2" value={pack.id} onChange={(e) => setPack(PACKETS.find((p) => p.id === e.target.value) ?? PACKETS[0])}>
              {PACKETS.map((p) => (
                <option key={p.id} value={p.id}>{p.name} · {p.diamonds} diamantes (simulados)</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-3">
            <button type="button" onClick={() => open(1)} className="btn btn-solid">Abrir 1 lote</button>
            <button type="button" onClick={() => open(10)} className="btn btn-warn">Abrir 10</button>
            <span className="tabular ml-auto pb-2 text-xs text-faint">lote {round}</span>
          </div>
        </div>

        <div className="mt-6 border border-line2 bg-ink2 p-5">
          <p className="tabular text-xs uppercase tracking-widest text-faint">acumulado simulado</p>
          <p className="font-display mt-1 text-4xl text-warn md:text-5xl">
            <CountUp value={totalGems} prefix="+" />
            <span className="ml-2 text-2xl text-bone">diamantes (ficticios)</span>
          </p>
          <p className="mt-2 text-xs text-faint"> diamantes salen de aquí hacia el juego. Siempre.</p>
        </div>

        {pulls.length > 0 && (
          <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {pulls.map((p, i) => (
              <li
                key={`${round}-${i}`}
                className={`border border-line2 bg-ink2 p-3 ${p.rarity.color}`}
                style={{ animation: "enter 0.3s ease-out both", animationDelay: `${(i % 10) * 40}ms` }}
              >
                <p className="text-xs font-bold uppercase tracking-wider">{p.rarity.name}</p>
                <p className="tabular mt-1">+{fmt(p.gems)} diamantes</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ToolPage>
  );
}