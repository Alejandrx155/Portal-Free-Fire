"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { randomName } from "@/content/generators";

export default function GeneradorNombresPage() {
  const [sym, setSym] = useState(true);
  const [maxLen, setMaxLen] = useState(14);
  const [names, setNames] = useState<string[]>(() => Array.from({ length: 6 }, () => randomName(true, 14)));

  function regen() {
    setNames(Array.from({ length: 6 }, () => randomName(sym, maxLen)));
  }

  return (
    <ToolPage
      path="/herramientas/generadores/nombres"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Nombres", href: "/herramientas/generadores/nombres" },
      ]}
      title="Generador de nombres"
      tag="GENERADOR · NAMES"
      intro="Nicknames con o sin símbolos, combinando apodos y sustantivos originales. Ningún nombre generado aquí duplicado de jugador real: solo inspiración."
      howTo={[
        "Activá o desactivá símbolos decorativos.",
        "Limitá la longitud si tu juego no acepta nombres largos.",
        "Regenerá hasta que te guste, y copiá el que elegiste.",
        "Verificá la disponibilidad del nombre al crearlo en el juego.",
      ]}
      related={[
        { href: "/herramientas/generadores/simbolos", label: "Símbolos decorativos", note: "para armar el tuyo" },
        { href: "/herramientas/generadores/bios", label: "Bios de perfil", note: "presentar el nombre" },
      ]}
      softwareName="Generador de nombres para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={sym}
              onChange={(e) => { setSym(e.target.checked); setNames((n) => n.map((x) => x)); }}
              className="h-4 w-4 accent-alert"
            />
            Con símbolos
          </label>
          <label className="block text-xs uppercase tracking-widest text-faint">
            Longitud máxima
            <input
              type="number"
              min="4"
              max="16"
              className="field mt-1 w-24"
              value={maxLen}
              onChange={(e) => setMaxLen(Math.max(4, Math.min(16, Number(e.target.value) || 4)))}
            />
          </label>
          <button type="button" onClick={regen} className="btn btn-solid">Generar 6</button>
        </div>
        <ul className="mt-6 space-y-2">
          {names.map((n, i) => (
            <li key={i} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <span className="font-mono text-lg text-bone">{n}</span>
              <CopyButton value={n} label="Copiar" />
            </li>
          ))}
        </ul>
      </div>
    </ToolPage>
  );
}