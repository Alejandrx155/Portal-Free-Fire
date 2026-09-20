import { notFound } from "next/navigation";
import { Ficha } from "@/components/Ficha";
import { TierBadge } from "@/components/DataTable";
import { meta } from "@/lib/meta";
import { absUrl } from "@/lib/site";
import { PETS } from "@/content/pets";

export const dynamicParams = false;

export function generateStaticParams() {
  return PETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PETS.find((x) => x.slug === slug);
  if (!p) return {};
  return meta(`${p.name}: habilidad de mascota`, p.desc, `/mascotas/${slug}`, "article");
}

export default async function MascotaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PETS.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <Ficha
      path={`/mascotas/${p.slug}`}
      crumbs={[{ label: "Mascotas", href: "/mascotas" }, { label: p.name, href: `/mascotas/${p.slug}` }]}
      kindLabel="ficha de mascota"
      title={p.name}
      tagline={p.desc}
      intro={`${p.name} aporta la habilidad ${p.skill} a tu escuadra. Efecto: ${p.effect}. Elegir mascota es elegir sinergia, no una mascota "mejor que todas" fuera de contexto.`}
      stats={[
        { label: "Tier del meta", value: <TierBadge tier={p.tier} /> },
        { label: "Habilidad", value: p.skill },
        { label: "Efecto", value: p.effect },
        { label: "Costo", value: <span className="tabular">{p.cost} diamantes (tienda)</span> },
      ]}
      extras={
        <div className="border border-line bg-surface p-5">
          <p className="tabular text-xs uppercase tracking-widest text-alert">con quién combina</p>
          <p className="mt-3 text-sm text-muted">
            {p.slug === "rockie"
              ? "Combina con personajes de habilidad activa potente: Alok, Chrono o K."
              : p.slug === "falco"
              ? "Combina con drops agresivos: Kelly, Chrono o cualquier rol ofensivo."
              : "Se adapta a casi toda escuadra; revisá el generador de combinaciones para un combo completo."}
          </p>
        </div>
      }
      updated="16 de agosto de 2026"
      related={[
        { href: "/herramientas/comparadores/mascotas", label: "Comparador de mascotas", note: "todas en una tabla" },
        { href: "/herramientas/generadores/combinaciones", label: "Generador de combinaciones", note: "personaje + mascota + arma" },
      ]}
      articleJsonLd={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${p.name}: habilidad y sinergia en Free Fire`,
        description: p.desc,
        dateModified: "16 de agosto de 2026",
        inLanguage: "es",
        mainEntityOfPage: absUrl(`/mascotas/${p.slug}`),
        publisher: { "@type": "Organization", name: "RADAR FF" },
      }}
    />
  );
}