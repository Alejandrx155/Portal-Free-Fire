import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { DataTable, TierBadge } from "@/components/DataTable";
import { PETS } from "@/content/pets";
import { VERIFIED } from "@/content/types";

export default function ComparadorMascotasPage() {
  const rows = PETS.map((p) => [
    <Link key="n" href={`/mascotas/${p.slug}`} className="inklink font-bold">{p.name}</Link>,
    <span key="s" className="text-muted">{p.skill}</span>,
    <span key="e" className="text-muted">{p.effect}</span>,
    <TierBadge key="t" tier={p.tier} />,
    <span key="c" className="tabular">{p.cost}</span>,
  ]);
  return (
    <ToolPage
      path="/herramientas/comparadores/mascotas"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Comparadores", href: "/herramientas" },
        { label: "Mascotas", href: "/herramientas/comparadores/mascotas" },
      ]}
      title="Comparador de mascotas"
      tag="COMPARADOR · PETS"
      intro="Habilidades y efectos de todas las mascotas en una tabla: la mascota correcta multiplica a tu personaje."
      howTo={[
        "Elegí según tu personaje: Falco con drops, Rockie con Alok/Chrono.",
        "El costo es típico de tienda; las cajas y eventos varían.",
        "Cada nombre abre la ficha con su sinergia sugerida.",
      ]}
      related={[
        { href: "/herramientas/generadores/combinaciones", label: "Generador de combinaciones", note: "todo junto" },
        { href: "/herramientas/tier-lists", label: "Tier list del meta", note: "mascotas incluidas" },
      ]}
      softwareName="Comparador de mascotas de Free Fire"
    >
      <DataTable
        headers={["Mascota", "Habilidad", "Efecto", "Tier", "Costo"]}
        rows={rows}
        footnote={`Costos verificados: ${VERIFIED}.`}
      />
    </ToolPage>
  );
}