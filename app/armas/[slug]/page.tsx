import { notFound } from "next/navigation";
import { Ficha } from "@/components/Ficha";
import { TierBadge, RatingDots } from "@/components/DataTable";
import { meta } from "@/lib/meta";
import { absUrl } from "@/lib/site";
import { WEAPONS } from "@/content/weapons";

export const dynamicParams = false;

export function generateStaticParams() {
  return WEAPONS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = WEAPONS.find((x) => x.slug === slug);
  if (!w) return {};
  return meta(`${w.name}: daño, cadencia y meta`, w.desc, `/armas/${slug}`, "article");
}

export default async function ArmaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = WEAPONS.find((x) => x.slug === slug);
  if (!w) notFound();

  const ttk = Math.round(60000 / w.rpm);

  return (
    <Ficha
      path={`/armas/${w.slug}`}
      crumbs={[{ label: "Armas", href: "/armas" }, { label: w.name, href: `/armas/${w.slug}` }]}
      kindLabel="ficha de arma"
      title={w.name}
      tagline={w.desc}
      intro={`${w.name} es un arma de la categoría ${w.category.toLowerCase()}. Sus números son referencia para comparar: daño por bala, cadencia y cargador definen su rol en el meta.`}
      stats={[
        { label: "Categoría", value: w.category },
        { label: "Tier del meta", value: <TierBadge tier={w.tier} /> },
        { label: "Daño por bala", value: <span className="tabular">{w.dmg}</span> },
        { label: "Cadencia", value: <span className="tabular">{w.rpm} disparos/min</span> },
        { label: "Tiempo entre balas", value: <span className="tabular">{ttk} ms</span> },
        { label: "Cargador", value: <span className="tabular">{w.mag} balas</span> },
        { label: "Alcance", value: <RatingDots value={w.range} /> },
        { label: "Precisión", value: <RatingDots value={w.accuracy} /> },
        { label: "Penetración", value: <RatingDots value={w.pen} max={3} /> },
        { label: "Movilidad", value: <RatingDots value={w.mobility} /> },
      ]}
      updated="16 de agosto de 2026"
      related={[
        { href: "/herramientas/comparadores/armas", label: "Comparador de armas", note: "una tabla para decidir" },
        { href: "/herramientas/calculadoras/dano", label: "Calculadora de daño", note: "arma + personaje + habilidades" },
        { href: "/herramientas/tier-lists", label: "Tier list del meta", note: "contexto por parche" },
      ]}
      articleJsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${w.name}: estadísticas y meta en Free Fire`,
        description: w.desc,
        dateModified: "16 de agosto de 2026",
        inLanguage: "es",
        mainEntityOfPage: absUrl(`/armas/${w.slug}`),
        publisher: { "@type": "Organization", name: "RADAR FF" },
      }}
    />
  );
}