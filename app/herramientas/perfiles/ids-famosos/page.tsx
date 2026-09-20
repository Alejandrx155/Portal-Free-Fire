"use client";

import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";

const EXAMPLE_IDS = [
  { uid: "482061415", region: "US", label: "Cuenta de prueba (US)" },
  { uid: "1633864660", region: "IND", label: "Cuenta de prueba (IND)" },
  { uid: "1187946149", region: "IND", label: "Cuenta de prueba (IND)" },
];

export default function IdsFamososPage() {
  return (
    <ToolPage
      path="/herramientas/perfiles/ids-famosos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Perfiles", href: "/herramientas/perfiles/antiguedad" },
        { label: "IDs de ejemplo", href: "/herramientas/perfiles/ids-famosos" },
      ]}
      title="IDs de ejemplo para consultar"
      tag="PERFIL · UID"
      intro="IDs públicos de prueba documentados en la API comunitaria para que probés el buscador de perfil. No listamos IDs de creadores reales sin su consentimiento: esa práctica invade privacidad."
      howTo={[
        "Copiá un ID de la lista o ingresá el tuyo.",
        "Consultalo en el buscador de perfil por ID.",
        "La región se detecta automáticamente.",
        "El nombre y los datos son los reales de la API si el servicio responde.",
      ]}
      related={[
        { href: "/herramientas/diamantes/jugador", label: "Buscar jugador por ID", note: "perfil completo real" },
        { href: "/herramientas/perfiles/antiguedad", label: "Antigüedad por UID", note: "fecha de creación" },
        { href: "/herramientas/perfiles/bio-por-id", label: "Bio por ID", note: "leé la firma del perfil" },
      ]}
      softwareName="Lista de IDs de ejemplo para consulta de perfil (educativo)"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <ul className="divide-y divide-line">
          {EXAMPLE_IDS.map((e) => (
            <li key={e.uid} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-0 flex-1">
                <p className="tabular font-mono text-lg text-bone">{e.uid}</p>
                <p className="text-xs text-faint">{e.label} · región {e.region}</p>
              </div>
              <CopyButton value={e.uid} label="Copiar ID" />
              <Link href="/herramientas/diamantes/jugador" className="btn btn-ghost">
                Ver perfil
              </Link>
            </li>
          ))}
        </ul>
        <p className="sim-note mt-6 p-3 text-xs leading-relaxed">
          Honestidad: no publicamos IDs de jugadores famosos ni creadores. Verificar la identidad de una cuenta por fuera
          del juego no es confiable y puede usarse para estafas. Usá estos IDs de prueba o tu propio UID.
        </p>
      </div>
    </ToolPage>
  );
}