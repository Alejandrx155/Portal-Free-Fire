"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { estimateRank, ELO_NOTE } from "@/content/game-math";
import { RANKS } from "@/content/game-math";

export default function CalculadoraEloPage() {
  const [bp, setBp] = useState(1800);
  const [kd, setKd] = useState(1.5);
  const [place, setPlace] = useState(6);

  const r = estimateRank(bp, kd, place);

  return (
    <ToolPage
      path="/herramientas/calculadoras/elo"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Calculadoras", href: "/herramientas" },
        { label: "Rango", href: "/herramientas/calculadoras/elo" },
      ]}
      title="Calculadora de rango (elo) estimado"
      tag="CALCULADORA · RANKED"
      intro="Estimá en qué rango competitivo podrías estar según booyah points, ratio de bajas y posición promedio. Orientativo: el matchmaking real usa muchas variables no públicas."
      howTo={[
        "Ingresá tus booyah points actuales (los ves en tu perfil).",
        "Estimá tu KD (bajas/muertes) y tu posición promedio.",
        "El resultado es un rango probable, no tu rango real.",
      ]}
      related={[
        { href: "/herramientas/calculadoras/nivel", label: "Nivel y experiencia", note: "progreso total" },
        { href: "/guias/nuevos-jugadores", label: "Guía para nuevos jugadores", note: "subir sin frustrarse" },
      ]}
      softwareName="Calculadora de rango estimado de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="elo-bp" className="block text-xs uppercase tracking-widest text-faint">Booyah points</label>
            <input id="elo-bp" type="number" min="0" max="10000" className="field mt-2" value={bp} onChange={(e) => setBp(Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="elo-kd" className="block text-xs uppercase tracking-widest text-faint">Ratio de bajas (KD)</label>
            <input id="elo-kd" type="number" step="0.1" min="0" max="20" className="field mt-2" value={kd} onChange={(e) => setKd(Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="elo-place" className="block text-xs uppercase tracking-widest text-faint">Posición promedio</label>
            <input id="elo-place" type="number" min="1" max="48" className="field mt-2" value={place} onChange={(e) => setPlace(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-6 border border-warn bg-ink2 p-5">
          <p className="tabular text-xs uppercase tracking-widest text-warn">rango estimado</p>
          <p className="font-display mt-2 text-5xl text-warn">{r.rank}</p>
          <p className="tabular mt-2 text-sm text-muted">Puntería estimada: {r.points} puntos (sobre umbrales de referencia)</p>
        </div>
        <div className="mt-6">
          <p className="tabular text-xs uppercase tracking-widest text-faint">umbrales de referencia</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {RANKS.map((rd) => (
              <li key={rd.name} className="border border-line px-3 py-1.5 text-xs text-muted">{rd.name} · +{rd.min}</li>
            ))}
          </ul>
        </div>
        <p className="mt-5 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">{ELO_NOTE}</p>
      </div>
    </ToolPage>
  );
}