"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { randomFemaleNick, randomMaleNick, randomCouple, randomFakeNick } from "@/content/generators";

const TABS = [
  { id: "femenino", label: "Femeninos" },
  { id: "masculino", label: "Masculinos" },
  { id: "pareja", label: "Parejas" },
  { id: "fake", label: "Fake nick" },
] as const;

type Tab = (typeof TABS)[number]["id"];

function generate(tab: Tab): string[] {
  if (tab === "femenino") return Array.from({ length: 6 }, () => randomFemaleNick(true));
  if (tab === "masculino") return Array.from({ length: 6 }, () => randomMaleNick(true));
  if (tab === "pareja") {
    return Array.from({ length: 6 }, () => {
      const c = randomCouple(true);
      return `${c.a} + ${c.b}`;
    });
  }
  return Array.from({ length: 6 }, () => randomFakeNick());
}

export default function NicksTematicosPage() {
  const [tab, setTab] = useState<Tab>("femenino");
  const [items, setItems] = useState<string[]>(() => generate("femenino"));

  function switchTab(t: Tab) {
    setTab(t);
    setItems(generate(t));
  }

  return (
    <ToolPage
      path="/herramientas/generadores/nick-tematicos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Nicks temáticos", href: "/herramientas/generadores/nick-tematicos" },
      ]}
      title="Nicks temáticos"
      tag="GENERADOR · NICKS"
      intro="Nombres femeninos, masculinos, para parejas y 'fake nicks' (con espacio invisible). Datos reales de estilos populares, generados con lógica local: inspiración, no duplicados."
      howTo={[
        "Elegí la categoría: femeninos, masculinos, parejas o fake.",
        "Regenerá hasta encontrar el que te guste.",
        "Copiá el nombre y verificá disponibilidad al crearlo.",
        "El fake nick usa un espacio invisible para destacar en las listas; no es un exploit ni modifica el juego.",
      ]}
      related={[
        { href: "/herramientas/fuentes-unicode", label: "Fuentes Unicode", note: "estilizá cualquier nombre" },
        { href: "/herramientas/generadores/nombres", label: "Generador de nombres", note: "apodos combinados" },
        { href: "/herramientas/generadores/simbolos", label: "Símbolos decorativos", note: "personalizá" },
      ]}
      softwareName="Generador de nicks temáticos para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => switchTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "border border-line2 bg-raised text-bone"
                  : "text-muted hover:bg-raised hover:text-bone"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <button type="button" onClick={() => setItems(generate(tab))} className="btn btn-solid">
            Regenerar 6
          </button>
        </div>
        <ul className="mt-6 space-y-2">
          {items.map((n, i) => (
            <li key={i} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <span className="break-all font-mono text-lg text-bone">{n}</span>
              <CopyButton value={n} label="Copiar" />
            </li>
          ))}
        </ul>
        {tab === "fake" && (
          <p className="mt-5 text-xs leading-relaxed text-faint">
            El fake nick agrega el espacio invisible U+1160 para que el nombre quede alineado o parezca distinto en las
            listas. Si tu versión no lo renderiza, probá con otro número.
          </p>
        )}
      </div>
    </ToolPage>
  );
}