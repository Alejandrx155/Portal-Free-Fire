"use client";

import { useMemo, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { useToast } from "@/components/Toast";
import { symbolBurst } from "@/content/generators";
import { SYMBOL_PACKS } from "@/content/symbol-packs";

export default function SimbolosPage() {
  const [count, setCount] = useState(5);
  const [burst, setBurst] = useState(() => symbolBurst(5));
  const [query, setQuery] = useState("");
  const { show, host } = useToast();

  const packs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SYMBOL_PACKS;
    return SYMBOL_PACKS.map((p) => ({
      ...p,
      items: p.items.filter((s) => s.toLowerCase().includes(q)),
    })).filter((p) => p.items.length > 0);
  }, [query]);

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
      path="/herramientas/generadores/simbolos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Símbolos", href: "/herramientas/generadores/simbolos" },
      ]}
      title="Símbolos especiales para Free Fire"
      tag="GENERADOR · SYMBOLS"
      intro="Más de 8,000 símbolos y adornos compatibles con nicknames y bios de Free Fire: decoraciones, formas, marcas, referencias pop y letras asiáticas. Buscá, tocá y copiá al instante."
      howTo={[
        "Usá el buscador para filtrar símbolos en vivo, sin recargar.",
        "Tocá un símbolo para copiarlo con un toque (feedback instantáneo).",
        "Combiná con el generador de nicks o fuentes unicode para tu estilo final.",
        "Algunos símbolos no se renderizan en versiones viejas del juego: probá antes de guardar.",
      ]}
      related={[
        { href: "/herramientas/generadores/nombres", label: "Generador de nicks", note: "con símbolos integrados" },
        { href: "/herramientas/generadores/espacio-invisible", label: "Espacio invisible", note: "caracteres transparentes" },
        { href: "/herramientas/fuentes-unicode", label: "Fuentes Unicode", note: "letras pequeñas y adornadas" },
      ]}
      softwareName="Generador de símbolos especiales para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="flex flex-wrap items-end gap-4">
          <label className="block text-xs uppercase tracking-widest text-faint">
            Cantidad de símbolos
            <input
              type="number"
              min="1"
              max="30"
              className="field mt-1 w-24"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
            />
          </label>
          <button type="button" onClick={() => setBurst(symbolBurst(count))} className="btn btn-solid">
            Generar ristra
          </button>
          <CopyButton value={burst} label="Copiar ristra" />
        </div>
        <p className="mt-6 min-h-12 break-all rounded-xl border border-line bg-ink2 px-4 py-3 font-mono text-lg leading-relaxed text-warn">
          {burst}
        </p>

        <div className="mt-6">
          <label className="block text-xs uppercase tracking-widest text-faint" htmlFor="sym-search">
            Filtro rápido (busca en vivo)
          </label>
          <input
            id="sym-search"
            className="field mt-1"
            placeholder="Buscá un símbolo o categoría…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-8">
          {packs.map((pack) => (
            <section key={pack.id}>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">{pack.emoji}</span>
                <h2 className="font-display text-sm uppercase tracking-widest text-bone">{pack.name}</h2>
                <span className="tabular ml-auto text-xs text-faint">{pack.items.length} símbolos</span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pack.items.map((s, i) => (
                  <li key={`${pack.id}-${i}`}>
                    <button
                      type="button"
                      className="border border-line px-2.5 py-1.5 font-mono text-lg text-bone transition-transform duration-150 hover:-translate-y-0.5 hover:border-warn"
                      onClick={() => copySymbol(s)}
                      aria-label={`Copiar símbolo ${s}`}
                      title="Tocar para copiar"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {packs.length === 0 && <p className="text-sm text-faint">Sin resultados para esa búsqueda.</p>}
        </div>
      </div>
      {host}
    </ToolPage>
  );
}