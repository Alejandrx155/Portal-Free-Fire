"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import type { PlayerApiResponse, PlayerData } from "@/app/api/player/route";

type View =
  | { phase: "idle" }
  | { phase: "loading"; uid: string }
  | { phase: "ok"; data: PlayerData; uid: string }
  | { phase: "error"; uid: string; code: string; error: string };

function ageText(createdIso: string | null): string {
  if (!createdIso) return "No disponible";
  const created = new Date(createdIso).getTime();
  if (Number.isNaN(created)) return "No disponible";
  const days = Math.max(0, Math.floor((Date.now() - created) / 86_400_000));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} año${years !== 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mes${months !== 1 ? "es" : ""}`);
  if (parts.length === 0) parts.push(`${days} día${days !== 1 ? "s" : ""}`);
  return parts.join(" y ");
}

export default function AntiguedadPage() {
  const [id, setId] = useState("");
  const [view, setView] = useState<View>({ phase: "idle" });

  async function runSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const uid = id.trim();
    if (!uid || view.phase === "loading") return;
    setView({ phase: "loading", uid });
    try {
      const res = await fetch(`/api/player?uid=${encodeURIComponent(uid)}`);
      const json = (await res.json()) as PlayerApiResponse;
      if (json.ok) {
        setView({ phase: "ok", data: json.data, uid });
      } else {
        setView({ phase: "error", uid, code: json.code, error: json.error });
      }
    } catch {
      setView({
        phase: "error",
        uid,
        code: "unavailable",
        error: "No se pudo conectar con el servidor de consulta. Probá de nuevo en unos segundos.",
      });
    }
  }

  return (
    <ToolPage
      path="/herramientas/perfiles/antiguedad"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Perfiles", href: "/herramientas/perfiles/antiguedad" },
        { label: "Antigüedad por UID", href: "/herramientas/perfiles/antiguedad" },
      ]}
      title="Antigüedad y fecha de creación de cuenta"
      tag="PERFIL · UID · NO OFICIAL"
      intro="Ingresá un UID y la API comunitaria devuelve la fecha real de creación de la cuenta: calculamos cuánto tiempo lleva activa, junto con región, nivel y diamantes requeridos. Educativo y no oficial: el dato nunca se inventa."
      howTo={[
        "Ingresá el ID numérico del jugador.",
        "La región se detecta automáticamente entre todas.",
        "El resultado muestra la fecha de creación y la antigüedad calculada.",
        "Si el servicio comunitario está caído, aparece un error honesto.",
      ]}
      related={[
        { href: "/herramientas/diamantes/jugador", label: "Perfil por ID", note: "nickname, rango, gremio, mascota" },
        { href: "/herramientas/perfiles/bio-por-id", label: "Bio por ID", note: "leé la firma real del perfil" },
        { href: "/herramientas/calculadoras/nivel", label: "Calculadora de nivel", note: "experiencia estimada" },
      ]}
      softwareName="Calculadora de antigüedad de cuenta de Free Fire (educativa)"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <form onSubmit={runSearch} className="flex flex-col gap-3 sm:flex-row">
          <input
            className="field min-w-0 flex-1"
            placeholder="ID del jugador (ej: 482061415)"
            inputMode="numeric"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" className="btn btn-solid sm:w-44 sm:shrink-0" disabled={view.phase === "loading"}>
            {view.phase === "loading" ? "Buscando…" : "Consultar"}
          </button>
        </form>

        {view.phase === "loading" && (
          <div className="mt-6 flex items-center gap-3 border border-line bg-ink2 px-4 py-5">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-line2 border-t-alert" aria-hidden="true" />
            <p className="text-sm text-muted">Consultando la API comunitaria…</p>
          </div>
        )}

        {view.phase === "error" && (
          <div className="mt-6 border border-line bg-ink2 px-4 py-5">
            <p className="text-sm leading-relaxed text-warn">{view.error}</p>
            <div className="mt-4">
              <button type="button" onClick={() => runSearch()} className="btn btn-solid">
                Reintentar consulta
              </button>
            </div>
          </div>
        )}

        {view.phase === "ok" && (
          <div className="mt-6 rounded-2xl border border-line bg-ink2 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-xl font-bold text-bone">{view.data.nickname}</p>
              <span className="chip">
                <span className="chip-dot" aria-hidden="true" />
                {view.data.region}
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="tabular text-xs uppercase tracking-widest text-faint">Cuenta creada</dt>
                <dd className="mt-1 text-bone">
                  {view.data.created ? new Date(view.data.created).toLocaleDateString() : "—"}
                </dd>
              </div>
              <div>
                <dt className="tabular text-xs uppercase tracking-widest text-faint">Antigüedad</dt>
                <dd className="mt-1 font-semibold text-radar">{ageText(view.data.created)}</dd>
              </div>
              <div>
                <dt className="tabular text-xs uppercase tracking-widest text-faint">Nivel</dt>
                <dd className="mt-1 text-bone">{view.data.level}</dd>
              </div>
              <div>
                <dt className="tabular text-xs uppercase tracking-widest text-faint">Rango</dt>
                <dd className="mt-1 text-bone">{view.data.rank ?? "—"}</dd>
              </div>
              <div>
                <dt className="tabular text-xs uppercase tracking-widest text-faint">Gremio</dt>
                <dd className="mt-1 text-bone">{view.data.clan ?? "Sin gremio"}</dd>
              </div>
              <div>
                <dt className="tabular text-xs uppercase tracking-widest text-faint">Diamantes requeridos</dt>
                <dd className="mt-1 text-bone">{view.data.diamondCost ?? "—"}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-faint">
              Dato comunitario no oficial (fuente: {view.data.source}). La fecha exacta solo la muestra el propio juego;
              acá puede variar por la antigüedad del caché de la API.
            </p>
          </div>
        )}
      </div>
    </ToolPage>
  );
}