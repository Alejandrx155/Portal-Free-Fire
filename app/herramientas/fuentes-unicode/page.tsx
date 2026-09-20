"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { FONT_STYLES, toStyle } from "@/content/fonts";

export default function FuentesUnicodePage() {
  const [text, setText] = useState("FREE FIRE");

  return (
    <ToolPage
      path="/herramientas/fuentes-unicode"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Fuentes Unicode", href: "/herramientas/fuentes-unicode" },
      ]}
      title="Fuentes y letras Unicode"
      tag="FUENTES · UNICODE"
      intro="Convertí cualquier texto a fuentes Unicode reales (versalitas, gótica, cursiva, cuadros, superíndice) para tu nick o bio. Las fuentes las renderiza el juego: si un carácter no se ve, probá otro estilo."
      howTo={[
        "Escribí tu nombre o frase en el campo.",
        "Mirá la vista previa en cada estilo.",
        "Copiá el que más te guste.",
        "Pegalo en Free Fire; algunos caracteres pueden verse vacíos en ciertas versiones: cambiá de estilo.",
      ]}
      related={[
        { href: "/herramientas/generadores/nombres", label: "Generador de nombres", note: "combiná apodos" },
        { href: "/herramientas/generadores/simbolos", label: "Símbolos decorativos", note: "para armar el tuyo" },
        { href: "/herramientas/generadores/bios", label: "Bios de perfil", note: "presentar el nombre" },
      ]}
      softwareName="Fuentes Unicode para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <label htmlFor="fonts-input" className="block text-xs uppercase tracking-widest text-faint">Tu texto</label>
        <input
          id="fonts-input"
          className="field mt-2"
          value={text}
          maxLength={30}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-6 space-y-3">
          {FONT_STYLES.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-faint">{s.label}</p>
                <p className="mt-1 break-all font-mono text-lg text-bone">{toStyle(text || " ", s)}</p>
              </div>
              <CopyButton value={toStyle(text, s)} label="Copiar" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-faint">
          Los caracteres especiales y espacios se mantienen tal cual. Las fuentes son mapas Unicode estándar: no se
          inventa ningún carácter.
        </p>
      </div>
    </ToolPage>
  );
}