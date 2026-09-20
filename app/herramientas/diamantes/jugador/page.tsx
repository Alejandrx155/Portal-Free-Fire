"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import type { PlayerApiResponse, PlayerData } from "@/app/api/player/route";

type View =
  | { phase: "idle" }
  | { phase: "loading"; uid: string }
  | { phase: "ok"; data: PlayerData }
  | { phase: "error"; uid: string; code: string; error: string };

export default function JugadorPage() {
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
        setView({ phase: "ok", data: json.data });
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
      path="/herramientas/diamantes/jugador"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Diamantes", href: "/herramientas/diamantes/calculadora" },
        { label: "Buscar jugador por ID", href: "/herramientas/diamantes/jugador" },
      ]}
      title="Buscar jugador por ID"
      tag="BÚSQUEDA · EDUCATIVO · NO OFICIAL"
      intro="Consultá el perfil público de un jugador por su ID usando la API comunitaria free-ff-api. La región se detecta automáticamente: buscamos en todas las regiones soportadas. Es una herramienta educativa no oficial: cuando el servicio responde, el nombre que ves es el real."
      howTo={[
        "Ingresá el ID numérico del jugador (no hace falta elegir región: se busca en todas automáticamente).",
        "El nombre mostrado es real solo si el servicio comunitario responde.",
        "La región encontrada aparece junto a los datos del perfil.",
        "Si el servicio está caído, aparece un error honesto: nunca inventamos datos.",
      ]}
      related={[
        { href: "/herramientas/diamantes/calculadora", label: "Calculadora de diamantes", note: "valores de recarga" },
        { href: "/guias/estafas-diamantes-gratis", label: "Guía anti-estafas", note: "no compres ni vendas cuentas" },
        { href: "/herramientas/simulador-estafas", label: "Simulador", note: "reconocé el patrón" },
      ]}
      softwareName="Buscador de jugador por ID (educativo) para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="border border-alert/40 bg-ink2 px-4 py-3">
          <p className="text-sm leading-relaxed text-alert">
            Herramienta <strong>Diamantes</strong> .
          </p>
        </div>

        <form onSubmit={runSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="field min-w-0 flex-1"
            placeholder="ID del jugador (ej: 1234567890)"
            inputMode="numeric"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" className="btn btn-solid sm:w-44 sm:shrink-0" disabled={view.phase === "loading"}>
            {view.phase === "loading" ? "Buscando…" : "Buscar"}
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
          <div className="mt-6">
            <div className="border border-line bg-ink2 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xl font-bold text-bone">{view.data.nickname}</p>
                <span className="chip">
                  <span className="chip-dot" aria-hidden="true" />
                  EDUCATIVO · NO OFICIAL
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">ID</dt>
                  <dd className="mt-1 text-bone">{id}</dd>
                </div>
                <div>
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">Nivel</dt>
                  <dd className="mt-1 text-bone">{view.data.level}</dd>
                </div>
                <div>
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">Región</dt>
                  <dd className="mt-1 text-bone">{view.data.region}</dd>
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
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">Mascota</dt>
                  <dd className="mt-1 text-bone">{view.data.pet ?? "—"}</dd>
                </div>
                <div>
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">Cuenta creada</dt>
                  <dd className="mt-1 text-bone">{view.data.created ? new Date(view.data.created).toLocaleDateString() : "—"}</dd>
                </div>
                <div>
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">Likes</dt>
                  <dd className="mt-1 text-bone">{view.data.likes ?? "—"}</dd>
                </div>
                <div>
                  <dt className="tabular text-xs uppercase tracking-widest text-faint">Diamantes requeridos</dt>
                  <dd className="mt-1 text-bone">{view.data.diamondCost ?? "—"}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton
                  value={`${view.data.nickname} · ID ${id} · Nv. ${view.data.level} · ${view.data.region}`}
                  label="Copiar"
                />
                <span className="tabular self-center text-xs text-faint">Fuente: {view.data.source}</span>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-faint">
              El nombre proviene de una API comunitaria (free-ff-api), no de Garena. Puede estar desactualizado o ser
              inexacto; el único estado oficial se consulta dentro del juego. No compres ni vendas cuentas con estos
              datos.
            </p>
          </div>
        )}
      </div>
    </ToolPage>
  );
}