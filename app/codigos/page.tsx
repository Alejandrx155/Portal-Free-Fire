import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { CountUp } from "@/components/CountUp";
import { AdSlot } from "@/components/AdSlot";
import { AlertForm } from "@/components/AlertForm";
import { meta } from "@/lib/meta";
import { ACTIVE_CODES, CODES_VERIFIED } from "@/content/codes";

export const metadata = meta(
  "Códigos de canje de Free Fire",
  "Códigos de canje de Free Fire verificados con fecha, historial de vencidos y formato educacional. Sin códigos inventados ni promesas de diamantes.",
  "/codigos"
);

export default function CodigosPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <SectionTitle index="CODES" title="Códigos de canje" sub="Solo lo verificable: cada código con su fecha. Si no hay códigos activos, lo decimos." />
      <UpdatedStamp date={CODES_VERIFIED} what="Última verificación" />

      <section className="mt-8">
        <h2 className="font-display text-2xl uppercase text-warn">Activos hoy</h2>
        {ACTIVE_CODES.length === 0 ? (
          <div className="mt-4 border border-line bg-surface p-6">
            <p className="font-display text-5xl text-warn">
              <CountUp value={0} />
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              No hay códigos activos verificados a la fecha. Los códigos de Free Fire caducan rápido y casi nunca son de uso ilimitado.
              Esta página se actualiza cuando hay novedades reales; cualquier sitio que te muestre «códigos infinitos» está mintiendo.
            </p>
            <p className="mt-3 text-sm text-muted">
              Mientras tanto: <Link href="/codigos/canje" className="inklink">aprendé a canjear</Link> y mirá el{" "}
              <Link href="/codigos/historial" className="inklink">historial educativo</Link>.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto border border-line">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-ink2">
                  <th className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">Código</th>
                  <th className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">Recompensa</th>
                  <th className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">Verificado</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVE_CODES.map((c) => (
                  <tr key={c.code} className="border-b border-line/60 last:border-0">
                    <td className="tabular px-3 py-2.5 font-bold text-warn">{c.code}</td>
                    <td className="px-3 py-2.5 text-muted">{c.reward}</td>
                    <td className="tabular px-3 py-2.5 text-muted">{c.verified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl uppercase text-bone">Alertas de nuevos códigos</h2>
        <AlertForm />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl uppercase text-bone">Formato y buenas prácticas</h2>
        <ul className="mt-4 space-y-2">
          <li className="flex gap-3 text-sm text-muted"><span className="tabular text-alert">▸</span> Un código típico usa el patrón FF-XXXX-XXXX (ejemplo educativo).</li>
          <li className="flex gap-3 text-sm text-muted"><span className="tabular text-alert">▸</span> El canje se hace en el sitio oficial o dentro del juego: <Link href="/codigos/canje" className="inklink">guía paso a paso</Link>.</li>
          <li className="flex gap-3 text-sm text-muted"><span className="tabular text-alert">▸</span> Los códigos vencidos no se reactivan: ni nosotros ni nadie.</li>
        </ul>
      </section>

      <AdSlot className="mt-10" />
    </div>
  );
}