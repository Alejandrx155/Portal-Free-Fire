"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { randomCombo } from "@/content/generators";
import { POPULAR_COMBOS } from "@/content/combos";

const TABS = [
  { id: "populares", label: "Populares" },
  { id: "aleatorio", label: "Aleatorio" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function CombinacionesPage() {
  const [tab, setTab] = useState<Tab>("populares");
  const [combo, setCombo] = useState(() => randomCombo());

  return (
    <ToolPage
      path="/herramientas/generadores/combinaciones"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Combinaciones", href: "/herramientas/generadores/combinaciones" },
      ]}
      title="Combos de habilidades y combinaciones"
      tag="GENERADOR · COMBO"
      intro="Combos populares con personajes reales y su lógica de sinergia, más un generador aleatorio personaje + mascota + arma para salir de la rutina."
      howTo={[
        "En 'Populares' tenés los combos de escuadra que usa la comunidad, con el porqué de cada uno.",
        "En 'Aleatorio' generá una combinación y leé el hook de qué estilo sostiene.",
        "Probá en casuales primero: el combo tiene que encajar con cómo jugás.",
        "Combiná con la sensibilidad headshot si la combo es de puntería.",
      ]}
      related={[
        { href: "/herramientas/comparadores/personajes", label: "Comparador de personajes", note: "elegí con datos" },
        { href: "/herramientas/comparadores/armas", label: "Comparador de armas", note: "verificá números" },
        { href: "/herramientas/calculadoras/dano", label: "Calculadora de daño", note: "arma + personaje en números" },
      ]}
      softwareName="Combos de habilidades de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? "border border-line2 bg-raised text-bone" : "text-muted hover:bg-raised hover:text-bone"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "populares" && (
          <div className="mt-6 space-y-3">
            {POPULAR_COMBOS.map((c) => (
              <div key={c.id} className="border border-line bg-ink2 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-lg uppercase tracking-wide text-bone">{c.style}</p>
                  <span className="chip">
                    <span className="chip-dot" aria-hidden="true" />
                    {c.tag}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.chars.map((n) => (
                    <span key={n} className="rounded-full border border-line2 bg-surface px-3 py-1 text-sm text-bone">
                      {n}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.why}</p>
              </div>
            ))}
            <p className="text-xs leading-relaxed text-faint">
              Los combos usan personajes y habilidades reales del juego. La efectividad depende de tu estilo y de la versión
              activa: usá el comparador para verificar números.
            </p>
          </div>
        )}

        {tab === "aleatorio" && (
          <div className="mt-6">
            <button type="button" onClick={() => setCombo(randomCombo())} className="btn btn-solid">Generar combinación</button>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="hud-corners border border-line bg-ink2 p-4">
                <p className="tabular text-xs uppercase tracking-widest text-faint">personaje</p>
                <p className="mt-2 font-mono text-xl font-bold text-bone">{combo.char.name}</p>
                <p className="mt-1 text-xs text-muted">{combo.char.role} · {combo.char.active}</p>
              </div>
              <div className="hud-corners border border-line bg-ink2 p-4">
                <p className="tabular text-xs uppercase tracking-widest text-faint">mascota</p>
                <p className="mt-2 font-mono text-xl font-bold text-bone">{combo.pet.name}</p>
                <p className="mt-1 text-xs text-muted">{combo.pet.skill}</p>
              </div>
              <div className="hud-corners border border-line bg-ink2 p-4">
                <p className="tabular text-xs uppercase tracking-widest text-faint">arma</p>
                <p className="mt-2 font-mono text-xl font-bold text-bone">{combo.weapon.name}</p>
                <p className="mt-1 text-xs text-muted">{combo.weapon.category} · daño {combo.weapon.dmg}</p>
              </div>
            </div>
            <p className="mt-5 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">{combo.hook}</p>
          </div>
        )}
      </div>
    </ToolPage>
  );
}