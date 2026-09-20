"use client";

import { useMemo, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { useToast } from "@/components/Toast";

const INVISIBLE_CHARS = [
  { char: "\u3164", name: "Hangul Filler", note: "el más usado para nick invisibles" },
  { char: "\u1160", name: "Hangul Jungseong", note: "compatible con varias versiones" },
  { char: "\u200B", name: "Espacio de ancho cero (ZWSP)", note: "compatible, puede fallar en viejas" },
  { char: "\u2060", name: "Unidor de palabras", note: "invisible y estable" },
  { char: "\u00A0", name: "Espacio sin separación", note: "semi-invisible" },
  { char: "\u2003", name: "Espacio ancho (EM)", note: "espacio grande visible" },
];

export default function EspacioInvisiblePage() {
  const [count, setCount] = useState(3);
  const [char, setChar] = useState("\u3164");
  const { show, host } = useToast();

  const result = useMemo(() => char.repeat(count), [char, count]);

  async function copySymbol(s: string) {
    try {
      await navigator.clipboard.writeText(s);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = s;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    show("¡Copiado al portapapeles!");
  }

  return (
    <ToolPage
      path="/herramientas/generadores/espacio-invisible"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Nicks", href: "/herramientas/generadores/nombres" },
        { label: "Espacio invisible", href: "/herramientas/generadores/espacio-invisible" },
      ]}
      title="Espacio invisible para nick"
      tag="GENERADOR · INVISIBLE"
      intro="Caracteres transparentes para que tu nickname quede sin nombre visible (o con un nombre invisible antes del texto). Copiá el caracter invisible y pegalo en el campo de nickname del juego."
      howTo={[
        "Elegí el tipo de caracter invisible y cuántas veces repetirlo.",
        "Copialo con un toque (feedback instantáneo).",
        "Pegalos en tu nickname, solo o antes/después de tu nombre.",
        "Garena puede corregir o mostrar caracteres invisibles según la versión: es cosmético, no una ventaja.",
      ]}
      related={[
        { href: "/herramientas/generadores/nombres", label: "Generador de nicks", note: "combiná invisible + símbolos" },
        { href: "/herramientas/generadores/simbolos", label: "Símbolos especiales", note: "adornos y marcas" },
        { href: "/herramientas/generadores/nick-tematicos", label: "Nicks listos", note: "femeninos, masculinos y parejas" },
      ]}
      softwareName="Generador de espacio invisible para nick de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block text-xs uppercase tracking-widest text-faint">
            Caracter invisible
            <select className="field mt-1" value={char} onChange={(e) => setChar(e.target.value)}>
              {INVISIBLE_CHARS.map((c) => (
                <option key={c.char} value={c.char}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-widest text-faint">
            Repeticiones
            <input
              type="number"
              min="1"
              max="20"
              className="field mt-1 w-24"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            />
          </label>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-faint">Vista previa en vivo</p>
          <div className="mt-2 flex min-h-12 items-center justify-between gap-3 rounded-xl border border-line bg-ink2 px-4 py-3">
            <span className="min-w-0 flex-1 truncate font-mono text-lg text-bone" title="Seleccioná y copiá">
              {result.length > 0 ? result : "…"}
            </span>
            <button type="button" className="btn btn-solid" onClick={() => copySymbol(result)}>
              Copiar
            </button>
          </div>
          <p className="mt-3 text-xs text-faint">
            El caracter elegido se ve como un espacio vacío (o invisible): {INVISIBLE_CHARS.find((c) => c.char === char)?.note}.
          </p>
        </div>

        <div className="mt-6">
          <p className="tabular text-xs uppercase tracking-widest text-faint">banco de caracteres</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {INVISIBLE_CHARS.map((c) => (
              <li key={c.char}>
                <button
                  type="button"
                  className="border border-line px-3 py-2 text-left font-mono text-bone transition-transform duration-150 hover:-translate-y-0.5 hover:border-warn"
                  onClick={() => copySymbol(c.char)}
                  title={c.note}
                >
                  <span className="text-lg">{"\u00B7"}</span>
                  <span className="mt-1 block text-[0.65rem] text-faint">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-faint">Tocá un caracter para copiarlo con feedback instantáneo.</p>
        </div>

        <p className="sim-note mt-6 p-3 text-xs leading-relaxed">
          Nota honesta: un nick invisible es cosmético y puede ser corregido por el juego. No otorga ninguna ventaja y no
          está relacionado con diamantes, verificación ni premios.
        </p>
      </div>
      {host}
    </ToolPage>
  );
}