"use client";

import { useMemo, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { SENS_DPI, SENS_PRESETS, SENS_ROWS, scalePreset, SENS_NOTE } from "@/content/sensitivity";

export default function HeadshotPage() {
  const [dpi, setDpi] = useState<string>(SENS_DPI[1].label);
  const [play, setPlay] = useState<"headshot" | "one-tap">("headshot");

  const preset = useMemo(() => {
    const d = SENS_DPI.find((x) => x.label === dpi)!;
    return scalePreset(SENS_PRESETS[play], d.mult);
  }, [dpi, play]);

  const text = useMemo(() => {
    const lines = [`Config ${play === "headshot" ? "headshot" : "one-tap"} RADAR FF`, `DPI: ${dpi.split(" (")[0]}`];
    for (const row of SENS_ROWS) lines.push(`${row.label}: ${preset[row.key]}`);
    return lines.join("\n");
  }, [preset, dpi, play]);

  return (
    <ToolPage
      path="/herramientas/sensibilidad/headshot"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Sensibilidad", href: "/herramientas" },
        { label: "Headshot", href: "/herramientas/sensibilidad/headshot" },
      ]}
      title="Sensibilidad para headshot y one-tap"
      tag="SENSIBILIDAD · PUNTERÍA"
      intro="Sensibilidad 'headshot' mantiene la roja alta para apuntar rápido sin pasarse, y el preset one-tap sube aún más la roja: la técnica de puntería de un solo movimiento."
      howTo={[
        "Elegí estilo: headshot (equilibrado) u one-tap (agresivo).",
        "Indicá el DPI de tu teléfono.",
        "Copiá y probá en partidas de entrenamiento contra bots.",
        "El one-tap no es magia: es memoria muscular + práctica de arrastre corto.",
      ]}
      related={[
        { href: "/herramientas/sensibilidad/generador", label: "Generador completo", note: "dispositivo + FPS + mira" },
        { href: "/herramientas/sensibilidad/comparador", label: "Comparador antes/después", note: "ve la diferencia" },
        { href: "/herramientas/sensibilidad/gama", label: "Por gama de teléfono", note: "si tu equipo la sostiene" },
      ]}
      softwareName="Generador de sensibilidad headshot y one-tap"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hs-play" className="block text-xs uppercase tracking-widest text-faint">Estilo</label>
            <select id="hs-play" className="field mt-2" value={play} onChange={(e) => setPlay(e.target.value as "headshot" | "one-tap")}>
              <option value="headshot">Headshot (equilibrado)</option>
              <option value="one-tap">One-tap (agresivo)</option>
            </select>
          </div>
          <div>
            <label htmlFor="hs-dpi" className="block text-xs uppercase tracking-widest text-faint">DPI</label>
            <select id="hs-dpi" className="field mt-2" value={dpi} onChange={(e) => setDpi(e.target.value)}>
              {SENS_DPI.map((d) => <option key={d.label} value={d.label}>{d.label}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto border border-line2 bg-ink2">
          <table className="w-full min-w-[26rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line2">
                <th className="tabular px-3 py-2 text-xs uppercase tracking-widest text-faint">Ajuste</th>
                <th className="tabular px-3 py-2 text-xs uppercase tracking-widest text-warn">Valor</th>
              </tr>
            </thead>
            <tbody>
              {SENS_ROWS.map((row) => (
                <tr key={row.key} className="border-b border-line/50 last:border-0">
                  <td className="px-3 py-2 text-muted">{row.label}</td>
                  <td className="tabular px-3 py-2 text-2xl font-bold text-warn">{preset[row.key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre className="mt-5 overflow-x-auto whitespace-pre-wrap border border-line2 bg-ink2 p-4 font-mono text-xs leading-relaxed text-bone">{text}</pre>
        <div className="mt-4">
          <CopyButton value={text} label="Copiar configuración" />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-faint">{SENS_NOTE}</p>
      </div>
    </ToolPage>
  );
}