"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { randomReto } from "@/content/generators";

export default function RetosPage() {
  const [retos, setRetos] = useState<string[]>(() => Array.from({ length: 5 }, () => randomReto()));

  return (
    <ToolPage
      path="/herramientas/generadores/retos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Retos", href: "/herramientas/generadores/retos" },
      ]}
      title="Generador de retos para partidas privadas"
      tag="GENERADOR · CHALLENGES"
      intro="Retos para partidas personalizadas con amigos: suben la dificultad, no otorgan recompensas. Solo orgullo y risas."
      howTo={[
        "Generá 5 retos para la sesión.",
        "Asigná uno por partida y rotá de 'víctima'.",
        "Si un reto se cumple, se cumple: sin discusión de reglas.",
      ]}
      related={[
        { href: "/herramientas/generadores/clanes", label: "Clanes y escuadras", note: "organizá el equipo" },
        { href: "/herramientas/generadores/clave-sala", label: "Clave de sala", note: "formato de sala privada" },
      ]}
      softwareName="Generador de retos para partidas privadas"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <button type="button" onClick={() => setRetos(Array.from({ length: 5 }, () => randomReto()))} className="btn btn-solid">
          Generar 5 retos
        </button>
        <ol className="mt-6 space-y-2">
          {retos.map((r, i) => (
            <li key={i} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <span className="flex gap-3 text-muted">
                <span className="tabular text-alert">{String(i + 1).padStart(2, "0")}</span>
                <span>{r}</span>
              </span>
              <CopyButton value={r} label="Copiar" />
            </li>
          ))}
        </ol>
      </div>
    </ToolPage>
  );
}