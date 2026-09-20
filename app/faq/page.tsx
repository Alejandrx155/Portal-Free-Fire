import { SectionTitle } from "@/components/SectionTitle";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import { FAQS } from "@/content/events";
import { meta } from "@/lib/meta";

export const metadata = meta(
  "Preguntas frecuentes de Free Fire",
  "FAQ de Free Fire: diamantes, códigos, sensibilidad, simuladores y la relación del portal con Garena, respondidas sin humo.",
  "/faq"
);

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <SectionTitle index="FAQ" title="Preguntas frecuentes" sub="Respuestas cortas y honestas; si una respuesta no existe, lo decimos." />
      <div className="divide-y divide-line border-y border-line">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-bone transition-colors hover:text-warn">
              <span className="font-bold">{f.q}</span>
              <span aria-hidden="true" className="tabular shrink-0 text-alert transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <AdSlot className="mt-10" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}