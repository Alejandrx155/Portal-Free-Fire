import { SectionTitle } from "@/components/SectionTitle";
import { DisclaimerBlock } from "@/components/DisclaimerBlock";
import { meta } from "@/lib/meta";
import { SITE, absUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata = meta(
  "FREE FIRE",
  "",
  "/acerca"
);

export default function AcercaPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <SectionTitle index="ABOUT" title="Acerca de este portal" />
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-2xl uppercase text-bone">Qué es RADAR FF</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Somos un portal de fans de Free Fire en español: herramientas interactivas, contenido editorial y datos
            con fecha de verificación. Todo escrito originalmente, diseñado con identidad propia y orientado a móviles.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase text-bone">Lo que sí hacemos</h2>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> Herramientas con lógica real en el cliente: generadores, calculadoras, comparadores y simuladores.</li>
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> Guías y fichas sobre personajes, armas, mascotas, mapas y eventos.</li>
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> Una política editorial: si no está verificado, no se publica o se marca como pendiente.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase text-bone">Lo que no hacemos</h2>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> No vendemos, regalamos ni simulamos diamantes reales: {SITE.honesty}</li>
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> No publicamos códigos inventados ni eventos falsos.</li>
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> No copiamos textos ni diseños de otros sitios.</li>
            <li className="flex gap-3 text-muted"><span className="tabular text-alert">▸</span> No pedimos contraseñas ni datos de cuenta en ninguna herramienta.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase text-bone">Fuentes y actualización</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Los datos variables (códigos, eventos, precios, estadísticas) se actualizan manualmente y llevan la fecha
            de verificación visible. Para confirmar compras o canjes, la fuente final siempre es la app oficial del juego.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl uppercase text-bone">Contacto</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Para correcciones, sugerencias o avisos legítimos, escribinos a contacto@radarff.example (dirección de
            ejemplo hasta publicar el sitio real).
          </p>
        </section>
        <DisclaimerBlock />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Acerca de RADAR FF",
          url: absUrl("/acerca"),
          description: SITE.claim,
        }}
      />
    </div>
  );
}