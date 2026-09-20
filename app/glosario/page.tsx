import { SectionTitle } from "@/components/SectionTitle";
import { JsonLd } from "@/components/JsonLd";
import { GLOSSARY } from "@/content/events";
import { GUIDE_META } from "@/content/guides";
import { meta } from "@/lib/meta";

export const metadata = meta(
  "Glosario de términos de Free Fire",
  "Glosario de términos de Free Fire en español: zona, lore, headshot, rotación, EP, gloo y más, explicados para nuevos jugadores.",
  "/glosario"
);

export default function GlosarioPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <SectionTitle index="TERMS" title="Glosario" sub="El vocabulario de la comunidad, sin jerga académica." />
      <dl className="divide-y divide-line border-y border-line">
        {GLOSSARY.map((t) => (
          <div key={t.term} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="font-mono text-sm font-bold text-warn">{t.term}</dt>
            <dd className="text-sm leading-relaxed text-muted">{t.def}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-faint">
        ¿Nuevo en el juego? La <a href={GUIDE_META["nuevos-jugadores"].href} className="inklink">{GUIDE_META["nuevos-jugadores"].label}</a> explica el resto sin glosario.
      </p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Glosario de términos de Free Fire",
          inLanguage: "es",
          hasDefinedTerm: GLOSSARY.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.def,
          })),
        }}
      />
    </div>
  );
}