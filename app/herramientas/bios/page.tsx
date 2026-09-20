"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { BIO_FRAGMENTS } from "@/content/nicknames";
import { pick } from "@/lib/utils";
import { COLOR_CODES, FLAGS, HEARTBEAT_PATTERNS, COLOR_NOTE } from "@/content/bio-tools";

const TABS = [
  { id: "generador", label: "Generador colorido" },
  { id: "colores", label: "Códigos de color" },
  { id: "banderas", label: "Banderas" },
  { id: "latido", label: "Línea de latido" },
] as const;

type Tab = (typeof TABS)[number]["id"];

function buildColorfulBio(): string {
  return [pick(BIO_FRAGMENTS), pick(BIO_FRAGMENTS)].join(" ");
}

export default function BiosPage() {
  const [tab, setTab] = useState<Tab>("generador");
  const [bio, setBio] = useState<string>(() => buildColorfulBio());

  return (
    <ToolPage
      path="/herramientas/bios"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Bios", href: "/herramientas/bios" },
      ]}
      title="Bios y códigos de color"
      tag="BIO · PERSONALIZACIÓN"
      intro="Generador de bio, códigos de color hexadecimales, banderas y líneas de latido para tu perfil de Free Fire. Todo con datos reales para copiar."
      howTo={[
        "En 'Generador' armá frases al azar y copialas.",
        "En 'Códigos de color' copiá el hex que quieras aplicar.",
        "En 'Banderas' elegí tu bandera o combinación.",
        "La 'Línea de latido' se pega al final de la bio.",
      ]}
      related={[
        { href: "/herramientas/fuentes-unicode", label: "Fuentes Unicode", note: "estilizá el texto" },
        { href: "/herramientas/generadores/bios", label: "Generador de bios", note: "frases listas" },
        { href: "/herramientas/generadores/nick-tematicos", label: "Nicks temáticos", note: "combiná el nick" },
      ]}
      softwareName="Bios y códigos de color para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? "border border-line2 bg-raised text-bone" : "text-muted hover:bg-raised hover:text-bone"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "generador" && (
          <div className="mt-6">
            <button type="button" onClick={() => setBio(buildColorfulBio())} className="btn btn-solid">
              Generar bio
            </button>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap border border-line bg-ink2 p-4 font-mono text-sm leading-relaxed text-bone">{bio}</pre>
            <div className="mt-4">
              <CopyButton value={bio} label="Copiar bio" />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-faint">{COLOR_NOTE}</p>
          </div>
        )}

        {tab === "colores" && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {COLOR_CODES.map((c) => (
              <div key={c.hex} className="flex items-center justify-between gap-2 border border-line bg-ink2 px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full border border-line2" style={{ background: c.hex }} />
                  <span className="text-sm text-muted">{c.label}</span>
                </div>
                <CopyButton value={c.hex} label="Copiar" />
              </div>
            ))}
          </div>
        )}

        {tab === "banderas" && (
          <div className="mt-6 flex flex-wrap gap-2">
            {FLAGS.map((f) => (
              <CopyButton key={f} value={f} label={f} />
            ))}
          </div>
        )}

        {tab === "latido" && (
          <div className="mt-6 space-y-2">
            {HEARTBEAT_PATTERNS.map((p) => (
              <div key={p} className="flex items-center justify-between gap-3 border border-line bg-ink2 px-4 py-3">
                <span className="break-all font-mono text-lg text-bone">{p}</span>
                <CopyButton value={p} label="Copiar" />
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  );
}