"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import {
  SENS_PRESETS,
  SENS_ROWS,
  SENS_NOTE,
} from "@/content/sensitivity";

export default function ComparadorSensibilidadPage() {
  const [p1, setP1] = useState<keyof typeof SENS_PRESETS>("headshot");
  const [p2, setP2] = useState<keyof typeof SENS_PRESETS>("base");

  const a = SENS_PRESETS[p1];
  const b = SENS_PRESETS[p2];
  const diffs = SENS_ROWS.filter((r) => a[r.key] !== b[r.key]);

  const summary =
    diffs.length === 0
      ? "Los dos presets son idénticos: no hay cambio que probar."
      : `${diffs.length} ajustes cambian entre "${p1}" y "${p2}". El mayor salto: ${diffs[0].label} (${a[diffs[0].key]} → ${b[diffs[0].key]}).`;

  return (
    <ToolPage
      path="/herramientas/sensibilidad/comparador"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Sensibilidad", href: "/herramientas" },
        { label: "Comparador", href: "/herramientas/sensibilidad/comparador" },
      ]}
      title="Comparador de sensibilidad antes/después"
      tag="SENSIBILIDAD · ANÁLISIS"
      intro="Compará dos presets lado a lado y mirá exactamente qué cambia antes de tocar nada en el juego."
      howTo={[
        "Elegí un preset A (tu configuración actual o una base).",
        "Elegí un preset B (tu objetivo).",
        "La tabla marca en amarillo las diferencias y el resumen te dice el mayor salto.",
        "Un cambio de 2-4 puntos en la roja se nota más que 10 puntos en la cámara.",
      ]}
      related={[
        { href: "/herramientas/sensibilidad/generador", label: "Generador completo", note: "ajustado a tu equipo" },
        { href: "/herramientas/sensibilidad/headshot", label: "Headshot y one-tap", note: "presets de puntería" },
      ]}
      softwareName="Comparador de sensibilidad de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cmp-a" className="block text-xs uppercase tracking-widest text-faint">Preset A (actual)</label>
            <select id="cmp-a" className="field mt-2" value={p1} onChange={(e) => setP1(e.target.value as keyof typeof SENS_PRESETS)}>
              <option value="base">Estándar</option>
              <option value="headshot">Headshot</option>
              <option value="one-tap">One-tap</option>
            </select>
          </div>
          <div>
            <label htmlFor="cmp-b" className="block text-xs uppercase tracking-widest text-faint">Preset B (objetivo)</label>
            <select id="cmp-b" className="field mt-2" value={p2} onChange={(e) => setP2(e.target.value as keyof typeof SENS_PRESETS)}>
              <option value="base">Estándar</option>
              <option value="headshot">Headshot</option>
              <option value="one-tap">One-tap</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto border border-line2 bg-ink2">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line2">
                <th className="tabular px-3 py-2 text-xs uppercase tracking-widest text-faint">Ajuste</th>
                <th className="tabular px-3 py-2 text-xs uppercase tracking-widest text-alert">{p1}</th>
                <th className="tabular px-3 py-2 text-xs uppercase tracking-widest text-radar">{p2}</th>
                <th className="tabular px-3 py-2 text-xs uppercase tracking-widest text-faint">Δ</th>
              </tr>
            </thead>
            <tbody>
              {SENS_ROWS.map((row) => {
                const diff = a[row.key] - b[row.key];
                return (
                  <tr key={row.key} className={`border-b border-line/50 last:border-0 ${diff !== 0 ? "bg-warn/5" : ""}`}>
                    <td className="px-3 py-2 text-muted">{row.label}</td>
                    <td className={`tabular px-3 py-2 ${diff !== 0 ? "text-alert" : "text-muted"}`}>{a[row.key]}</td>
                    <td className={`tabular px-3 py-2 ${diff !== 0 ? "text-radar" : "text-muted"}`}>{b[row.key]}</td>
                    <td className={`tabular px-3 py-2 ${diff !== 0 ? "font-bold text-warn" : "text-faint"}`}>{diff !== 0 ? (diff > 0 ? `-${diff}` : `+${-diff}`) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-5 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">{summary}</p>
        <p className="mt-4 text-xs leading-relaxed text-faint">{SENS_NOTE}</p>
      </div>
    </ToolPage>
  );
}