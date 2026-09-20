import { SectionTitle } from "@/components/SectionTitle";
import { RadarMark } from "@/components/RadarMark";
import { meta } from "@/lib/meta";
import { SITE } from "@/lib/site";

export const metadata = meta(
  "Mi cuenta en RADAR FF",
  "Tu lugar en RADAR FF: guardar herramientas, favoritos e historial. La arquitectura de cuentas está preparada; la autenticación real llega en una fase posterior.",
  "/cuenta"
);

export default function CuentaPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <SectionTitle index="ACCT" title="Mi cuenta" sub="Lo que vas a poder guardar cuando la autenticación real esté operativa." />
      <div className="hud-corners border border-line bg-surface p-8">
        <RadarMark className="h-12 w-12 text-alert" />
        <p className="tabular mt-5 text-xs uppercase tracking-widest text-alert">estado: arquitectura lista</p>
        <h1 className="font-display mt-2 text-3xl uppercase text-bone">Cuentas en preparación</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Este portal está diseñado para cuentas reales con registro, inicio de sesión, recuperación de contraseña y
          perfil (favoritos, herramientas guardadas, sensibilidad guardada e historial). Esas funciones requieren un
          backend con base de datos y autenticación de verdad — no un login de cartón — y se lanzarán en una fase
          posterior del desarrollo.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Mientras tanto, las herramientas funcionan al 100% en tu navegador y algunas permiten guardar resultados
          localmente. {SITE.honesty}
        </p>
        <ul className="mt-6 space-y-2">
          <li className="flex gap-3 text-sm text-muted"><span className="tabular text-alert">▸</span> Favoritos: marcá guías, fichas y herramientas.</li>
          <li className="flex gap-3 text-sm text-muted"><span className="tabular text-alert">▸</span> Sensibilidad guardada: tus presets, en cualquier dispositivo.</li>
          <li className="flex gap-3 text-sm text-muted"><span className="tabular text-alert">▸</span> Historial de herramientas y valoraciones de guías sincronizadas.</li>
        </ul>
      </div>
    </div>
  );
}