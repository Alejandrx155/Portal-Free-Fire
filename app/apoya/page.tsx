import { SectionTitle } from "@/components/SectionTitle";
import { DisclaimerBlock } from "@/components/DisclaimerBlock";
import { JsonLd } from "@/components/JsonLd";
import { SUPPORT } from "@/lib/support";
import { meta } from "@/lib/meta";
import { SITE, absUrl } from "@/lib/site";

export const metadata = meta(
  "Apoya el proyecto",
  "Cómo apoyar a RADAR FF sin anuncios ni pago por dominio: donaciones, enlaces de compra afiliados y patrocinio directo. Seguimos siendo un portal independiente de fans.",
  "/apoya"
);

export default function ApoyaPage() {
  const hasDonation = SUPPORT.donationUrl.length > 0;
  const hasAffiliates = SUPPORT.affiliateLinks.length > 0;
  const hasSponsor = SUPPORT.sponsorEmail.length > 0;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <SectionTitle
        index="APOYA"
        title="Apoya este portal"
        sub="Tres formas de sostener el proyecto que no comprometen la independencia del contenido: tu apoyo jamás cambia una nota, un dato ni una recomendación."
      />

      <div className="space-y-6">
        <section className="border border-line bg-surface p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl uppercase text-bone">Donaciones</h2>
            <span className="tabular text-xs uppercase tracking-widest text-radar">cafecito / ko-fi / buy me a coffee</span>
          </div>
          <p className="mt-3 leading-relaxed text-muted">
            Plataformas de apoyo voluntario con comisión mínima. Funcionan con cualquier monto y no exigen
            registro por parte de quien dona. El enlace se activa cuando lo configures.
          </p>
          {hasDonation ? (
            <a
              href={SUPPORT.donationUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn btn-solid mt-4"
            >
              {SUPPORT.donationLabel} →
            </a>
          ) : (
            <p className="tabular mt-4 text-xs text-faint">
              estado: enlace de donación pendiente de configurar
            </p>
          )}
        </section>

        <section className="border border-line bg-surface p-5 md:p-6">
          <h2 className="font-display text-2xl uppercase text-bone">Enlaces de compra afiliados</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Programas de afiliados gratuitos (Amazon Associates, tiendas de tecnología y periféricos, apps de
            descarga). Cuando alguien compra desde un enlace recomendado aquí, el portal recibe una comisión
            sin que el comprador pague más. Solo se recomienda lo que usaríamos nosotros: móviles, tablets,
            fundas, auriculares y accesorios para jugar bien.
          </p>
          {hasAffiliates ? (
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {SUPPORT.affiliateLinks.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex items-baseline gap-3 py-3"
                  >
                    <span className="tabular text-xs text-alert" aria-hidden="true">▸</span>
                    <span className="min-w-0">
                      <span className="block font-bold text-bone group-hover:text-warn">{a.label}</span>
                      {a.note && <span className="mt-0.5 block text-sm text-muted">{a.note}</span>}
                    </span>
                    <span className="ml-auto self-center text-muted" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="tabular mt-4 text-xs text-faint">
              estado: enlaces afiliados pendientes de configurar
            </p>
          )}
          <p className="mt-4 text-xs leading-relaxed text-faint">
            Importante: los enlaces con destino de compra van marcados como <span className="tabular">rel=&quot;sponsored&quot;</span>.
            Free Fire no tiene un programa oficial de afiliados; por eso recomendamos producto gamer que el
            público del juego sí compra.
          </p>
        </section>

        <section className="border border-line bg-surface p-5 md:p-6">
          <h2 className="font-display text-2xl uppercase text-bone">Patrocinio directo</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Marcas y creadores pueden pautar en el portal de forma directa, sin intermediarios: mención clara
            como contenido promocionado, sin disfrazarlo de noticia. El contenido patrocinado se etiqueta.
          </p>
          {hasSponsor ? (
            <a href={`mailto:${SUPPORT.sponsorEmail}`} className="btn btn-ghost mt-4">
              Escribir a {SUPPORT.sponsorEmail}
            </a>
          ) : (
            <p className="tabular mt-4 text-xs text-faint">
              estado: correo de contacto pendiente de configurar
            </p>
          )}
        </section>

        <aside className="border border-line bg-surface p-5 text-sm text-muted md:p-6">
          <p className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-radar">
            <span className="hud-tick" aria-hidden="true" />
            Compromiso
          </p>
          <p className="mt-2 leading-relaxed">
            Ninguna de estas vías modifica el contenido: los códigos se verifican igual, los simuladores
            siguen marcados como simulación y nada se recomienda solo porque pague. {SITE.honesty}
          </p>
        </aside>

        <DisclaimerBlock />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Apoya a RADAR FF",
          url: absUrl("/apoya"),
          description: SITE.claim,
          inLanguage: "es",
        }}
      />
    </div>
  );
}