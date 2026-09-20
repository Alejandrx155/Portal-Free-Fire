import { SectionTitle } from "@/components/SectionTitle";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { Reveal } from "@/components/Reveal";
import { meta } from "@/lib/meta";
import { EVENTS, EVENTS_VERIFIED } from "@/content/events";

export const metadata = meta(
  "Calendario de eventos de Free Fire",
  "Eventos de Free Fire con estado de confirmación, fechas y recompensas descritas sin exagerar. Verificados y con fecha visible.",
  "/eventos"
);

export default function EventosPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <SectionTitle index="EVTS" title="Calendario de eventos" sub="Confirmado, sin confirmar o finalizado: nunca inventamos un evento para llenar el mes." />
      <UpdatedStamp date={EVENTS_VERIFIED} what="Última verificación" />
      <div className="mt-6 space-y-4">
        {EVENTS.map((e, i) => (
          <Reveal key={e.slug} delay={i * 70}>
            <article className="border border-line bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl uppercase text-bone">{e.title}</h2>
                <span
                  className={`tabular border px-2 py-0.5 text-xs font-bold ${
                    e.status === "Confirmado"
                      ? "border-radar text-radar"
                      : e.status === "Sin confirmar"
                      ? "border-warn text-warn"
                      : "border-line2 text-faint"
                  }`}
                >
                  {e.status}
                </span>
              </div>
              <p className="tabular mt-2 text-xs text-faint">
                {e.start}
                {e.end ? ` → ${e.end}` : ""} · tipo: {e.type}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{e.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={80}>
        <p className="mt-8 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">
          Los eventos «sin confirmar» son rumores de la comunidad: planificá con ellos, pero no gastes expectativas. Las recompensas reales siempre se anuncian en los canales oficiales del juego.
        </p>
      </Reveal>
    </div>
  );
}