"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CountUp } from "@/components/CountUp";
import { xpToNext, cumulativeXp, LEVEL_NOTE } from "@/content/game-math";

export default function CalculadoraNivelPage() {
  const [level, setLevel] = useState(40);

  const l = Math.max(1, Math.min(200, Math.round(level || 1)));
  const need = xpToNext(l);
  const total = cumulativeXp(l);

  return (
    <ToolPage
      path="/herramientas/calculadoras/nivel"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Calculadoras", href: "/herramientas" },
        { label: "Nivel", href: "/herramientas/calculadoras/nivel" },
      ]}
      title="Calculadora de nivel y experiencia"
      tag="CALCULADORA · XP"
      intro="Estimá la experiencia acumulada y lo que falta para el siguiente nivel. La curva real no es pública en detalle: esta aproximación se basa en informes de la comunidad."
      howTo={[
        "Ingresá tu nivel actual.",
        "La calculadora estima XP total acumulada y XP para subir.",
        "Usala como referencia de progreso, no como cifra oficial.",
      ]}
      related={[
        { href: "/herramientas/calculadoras/elo", label: "Rango estimado", note: "tu nivel competitivo" },
        { href: "/guias/guia-nuevos-jugadores", label: "Guía para nuevos jugadores", note: "el primer mes" },
      ]}
      softwareName="Calculadora de nivel y experiencia de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <label htmlFor="lvl" className="block text-xs uppercase tracking-widest text-faint">Tu nivel actual</label>
        <div className="mt-2 max-w-xs">
          <input id="lvl" type="number" min="1" max="200" className="field" value={level} onChange={(e) => setLevel(Number(e.target.value))} />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border border-line2 bg-ink2 p-5">
            <p className="tabular text-xs uppercase tracking-widest text-faint">XP acumulada estimada</p>
            <p className="font-display mt-2 text-4xl text-warn"><CountUp value={total} /></p>
          </div>
          <div className="border border-line2 bg-ink2 p-5">
            <p className="tabular text-xs uppercase tracking-widest text-faint">XP para el nivel {l + 1}</p>
            <p className="font-display mt-2 text-4xl text-warn"><CountUp value={need} /></p>
          </div>
        </div>
        <p className="mt-5 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">{LEVEL_NOTE}</p>
      </div>
    </ToolPage>
  );
}