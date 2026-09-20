"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { randomBio } from "@/content/generators";

export default function BiosPage() {
  const [bios, setBios] = useState<string[]>(() => Array.from({ length: 4 }, () => randomBio()));

  return (
    <ToolPage
      path="/herramientas/generadores/bios"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Generadores", href: "/herramientas" },
        { label: "Bios", href: "/herramientas/generadores/bios" },
      ]}
      title="Generador de bios y firmas de perfil"
      tag="GENERADOR · PROFILE"
      intro="Frases cortas con carácter de la comunidad, combinadas en pares con un símbolo al cierre. Originales y listas para tu perfil."
      howTo={[
        "Generá 4 propuestas de una vez.",
        "Copiá la que más te represente.",
        "Editá tranquilamente: es tu firma, no una sentencia.",
      ]}
      related={[
        { href: "/herramientas/generadores/simbolos", label: "Símbolos", note: "agregá tu sello" },
        { href: "/herramientas/generadores/nombres", label: "Nombres", note: "que combine con la bio" },
      ]}
      softwareName="Generador de bios para perfil de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <button type="button" onClick={() => setBios(Array.from({ length: 4 }, () => randomBio()))} className="btn btn-solid">
          Generar 4 bios
        </button>
        <ul className="mt-6 space-y-2">
          {bios.map((b, i) => (
            <li key={i} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <span className="text-bone">{b}</span>
              <CopyButton value={b} label="Copiar" />
            </li>
          ))}
        </ul>
      </div>
    </ToolPage>
  );
}