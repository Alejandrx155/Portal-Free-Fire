import { notFound } from "next/navigation";
import { Ficha } from "@/components/Ficha";
import { TierBadge } from "@/components/DataTable";
import { meta } from "@/lib/meta";
import { absUrl } from "@/lib/site";
import { CHARACTERS } from "@/content/characters";
import { PETS } from "@/content/pets";
import { WEAPONS } from "@/content/weapons";

export const dynamicParams = false;

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CHARACTERS.find((x) => x.slug === slug);
  if (!c) return {};
  return meta(`${c.name}: habilidad, costo y meta`, c.desc, `/personajes/${slug}`, "article");
}

export default async function PersonajePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CHARACTERS.find((x) => x.slug === slug);
  if (!c) notFound();

  const bestWeapon = WEAPONS.find((w) =>
    c.role === "Ofensivo" ? w.category === "Subfusiles" : w.category === "Rifles de asalto"
  );
  const bestPet = PETS.find((p) => p.tier === "S");

  return (
    <Ficha
      path={`/personajes/${c.slug}`}
      crumbs={[{ label: "Personajes", href: "/personajes" }, { label: c.name, href: `/personajes/${c.slug}` }]}
      kindLabel="ficha de personaje"
      title={c.name}
      tagline={c.desc}
      intro={`${c.name} es un personaje de rol ${c.role.toLowerCase()} con su propia sinergia de escuadra. ${c.active}. En pasiva: ${c.passive}.`}
      stats={[
        { label: "Rol", value: c.role },
        { label: "Tier del meta", value: <TierBadge tier={c.tier} /> },
        { label: "Habilidad activa", value: c.active },
        { label: "Habilidad pasiva", value: c.passive },
        { label: "Costo", value: <span className="tabular">{c.cost} diamantes (tienda)</span> },
        { label: "Cómo desbloquear", value: c.unlock },
      ]}
      extras={
        <div className="border border-line bg-surface p-5">
          <p className="tabular text-xs uppercase tracking-widest text-alert">sinergia sugerida</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {bestWeapon && (
              <li>
                Arma base: <a href={`/armas/${bestWeapon.slug}`} className="inklink">{bestWeapon.name}</a> (por rol {c.role.toLowerCase()})
              </li>
            )}
            {bestPet && (
              <li>
                Mascota: <a href={`/mascotas/${bestPet.slug}`} className="inklink">{bestPet.name}</a> — {bestPet.skill}
              </li>
            )}
            <li>
              Afiná miras y DPI en el <a href="/herramientas/sensibilidad/generador" className="inklink">generador de sensibilidad</a>.
            </li>
          </ul>
        </div>
      }
      updated="16 de agosto de 2026"
      related={[
        { href: "/herramientas/comparadores/personajes", label: "Comparador de personajes", note: "todas las habilidades en tabla" },
        { href: "/herramientas/generadores/combinaciones", label: "Generador de combinaciones", note: "personaje + mascota + arma" },
        { href: "/herramientas/tier-lists", label: "Tier list del meta", note: "con criterios y fecha" },
      ]}
      articleJsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${c.name}: habilidad, costo y meta en Free Fire`,
        description: c.desc,
        dateModified: "16 de agosto de 2026",
        inLanguage: "es",
        mainEntityOfPage: absUrl(`/personajes/${c.slug}`),
        publisher: { "@type": "Organization", name: "RADAR FF" },
      }}
    />
  );
}