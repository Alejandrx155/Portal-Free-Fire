"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { randomSalaKey } from "@/content/generators";

export default function ClaveSalaPage() {
  const [keys, setKeys] = useState<string[]>(() => Array.from({ length: 6 }, () => randomSalaKey()));

  return (
    <ToolPage
      path="/herramientas/generadores/clave-sala"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Clave de sala", href: "/herramientas/generadores/clave-sala" },
      ]}
      title="Generador de claves de sala personalizada"
      tag="GENERADOR · ROOM"
      intro="Claves con formato fácil de decir por voz: PALABRA-número. No son claves reales del juego: son sugerencias de formato para que tu sala sea fácil de compartir."
      howTo={[
        "Generá 6 claves candidatas.",
        "Elegí la más fácil de deletrear por voz.",
        "Al crear la sala, usá una clave de este estilo: se comparte en segundos.",
      ]}
      related={[
        { href: "/herramientas/generadores/retos", label: "Retos", note: "para llenar la sala" },
        { href: "/herramientas/generadores/clanes", label: "Clanes", note: "nombre de la escuadra" },
      ]}
      softwareName="Generador de claves de sala para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <button type="button" onClick={() => setKeys(Array.from({ length: 6 }, () => randomSalaKey()))} className="btn btn-solid">
          Generar 6 claves
        </button>
        <ul className="mt-6 space-y-2">
          {keys.map((k, i) => (
            <li key={i} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <span className="font-mono text-lg tracking-widest text-warn">{k}</span>
              <CopyButton value={k} label="Copiar" />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-faint">
          Ejemplo de formato, no claves reales de salas: la sala se crea dentro del juego.
        </p>
      </div>
    </ToolPage>
  );
}