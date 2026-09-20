import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { DataTable, TierBadge } from "@/components/DataTable";
import { CHARACTERS } from "@/content/characters";
import { VERIFIED } from "@/content/types";

export default function ComparadorPersonajesPage() {
  const rows = CHARACTERS.map((c) => [
    <Link key="n" href={`/personajes/${c.slug}`} className="inklink font-bold">{c.name}</Link>,
    c.role,
    <TierBadge key="t" tier={c.tier} />,
    <span key="a" className="text-muted">{c.active}</span>,
    <span key="p" className="text-muted">{c.passive}</span>,
    <span key="c" className="tabular">{c.cost}</span>,
  ]);
  return (
    <ToolPage
      path="/herramientas/comparadores/personajes"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Comparadores", href: "/herramientas" },
        { label: "Personajes", href: "/herramientas/comparadores/personajes" },
      ]}
      title="Comparador de personajes"
      tag="COMPARADOR · CHARACTERS"
      intro="Habilidades activas y pasivas de todos los personajes en una sola tabla, con rol, tier y costo en diamantes."
      howTo={[
        "Compará activa y pasiva lado a lado: muchas sinergias viven ahí.",
        "El costo en diamantes es el típico de tienda; las promociones cambian.",
        "Tocá el nombre para abrir la ficha completa con combinación sugerida.",
      ]}
      related={[
        { href: "/herramientas/generadores/combinaciones", label: "Generador de combinaciones", note: "personaje + mascota + arma" },
        { href: "/herramientas/tier-lists", label: "Tier list del meta", note: "¿quién juega hoy?" },
        { href: "/personajes", label: "Fichas de personajes", note: "detalle por personaje" },
      ]}
      softwareName="Comparador de personajes de Free Fire"
    >
      <DataTable
        headers={["Personaje", "Rol", "Tier", "Activa", "Pasiva", "Costo"]}
        rows={rows}
        footnote={`Costo típico en diamantes según la tienda, verificado: ${VERIFIED}.`}
      />
    </ToolPage>
  );
}