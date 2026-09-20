"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import type { PlayerApiResponse } from "@/app/api/player/route";

type View =
  | { phase: "idle" }
  | { phase: "loading"; uid: string }
  | { phase: "ok"; uid: string; name: string; bio: string }
  | { phase: "error"; uid: string; code: string; error: string };

export default function BioPorIdPage() {
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
        setView({ phase: "ok", uid, name: json.data.nickname, bio: json.data.bio ?? "" });
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
      path="/herramientas/perfiles/bio-por-id"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Perfiles", href: "/herramientas/perfiles/antiguedad" },
        { label: "Bio por ID", href: "/herramientas/perfiles/bio-por-id" },
      ]}
      title="Visor de bio por ID"
      tag="PERFIL · BIO · NO OFICIAL"
      intro="Leé la firma (bio) pública de un jugador por su ID usando la API comunitaria. Los datos son reales cuando el servicio responde; nunca se inventan."
      howTo={[
        "Ingresá el ID numérico del jugador.",
        "La API devuelve la bio pública de su perfil, si está configurada.",
        "Copiá la bio con un toque.",
        "Si el servicio está caído, aparece un error honesto.",
      ]}
      related={[
        { href: "/herramientas/diamantes/jugador", label: "Perfil por ID", note: "nickname, rango, gremio, mascota" },
        { href: "/herramientas/perfiles/antiguedad", label: "Antigüedad por UID", note: "fecha de creación real" },
        { href: "/herramientas/bios", label: "Generador de bio colorida", note: "creá tu propia bio" },
      ]}
      softwareName="Visor de bio por ID de Free Fire (educativo)"
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
            <p className="text-xs uppercase tracking-widest text-faint">Bio de {view.name}</p>
            {view.bio ? (
              <>
                <p className="mt-3 min-h-12 whitespace-pre-wrap break-words rounded-xl border border-line bg-surface px-4 py-3 text-bone">
                  {view.bio}
                </p>
                <div className="mt-4">
                  <CopyButton value={view.bio} label="Copiar bio" />
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted">Este jugador no tiene una bio pública configurada.</p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-faint">
              Dato comunitario no oficial. La bio mostrada es la firma pública que devuelve la API; puede estar
              desactualizada respecto del juego.
            </p>
          </div>
        )}
      </div>
    </ToolPage>
  );
}