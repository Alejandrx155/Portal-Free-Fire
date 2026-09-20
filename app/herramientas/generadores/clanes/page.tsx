"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { randomClan } from "@/content/generators";

export default function ClanesPage() {
  const [items, setItems] = useState(() => Array.from({ length: 6 }, () => randomClan()));

  return (
    <ToolPage
      path="/herramientas/generadores/clanes"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Clanes", href: "/herramientas/generadores/clanes" },
      ]}
      title="Generador de clanes y escuadras"
      tag="GENERADOR · CLAN"
      intro="Nombre de clan + tag de tres letras, con la estética de los prefijos y sufijos que usa la comunidad. Verificá la disponibilidad del tag en el juego."
      howTo={[
        "Generá 6 propuestas de nombre + tag.",
        "Fijate que el tag no esté tomado en el buscador de clanes.",
        "Copiá y listo: la escuadra solo necesita nombre y ganas.",
      ]}
      related={[
        { href: "/herramientas/generadores/nombres", label: "Nombres de jugador", note: "para cada miembro" },
        { href: "/herramientas/generadores/retos", label: "Retos de escuadra", note: "actividades para el clan" },
      ]}
      softwareName="Generador de nombres de clan para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <button type="button" onClick={() => setItems(Array.from({ length: 6 }, () => randomClan()))} className="btn btn-solid">
          Generar 6 clanes
        </button>
        <ul className="mt-6 space-y-2">
          {items.map((c, i) => (
            <li key={i} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <span className="min-w-0">
                <span className="font-display block text-xl uppercase tracking-wide text-bone">{c.name}</span>
                <span className="tabular text-xs text-alert">TAG: {c.tag}</span>
              </span>
              <CopyButton value={`${c.name} [${c.tag}]`} label="Copiar" />
            </li>
          ))}
        </ul>
      </div>
    </ToolPage>
  );
}