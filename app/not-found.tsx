import Link from "next/link";
import { RadarMark } from "@/components/RadarMark";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-20 md:py-28">
      <div className="hud-corners border border-line bg-surface p-8 md:p-12">
        <RadarMark className="h-16 w-16 text-alert" />
        <p className="tabular mt-6 text-xs uppercase tracking-widest text-faint">error 404 / señal perdida</p>
        <h1 className="font-display mt-2 text-5xl uppercase tracking-wide text-bone md:text-6xl">
          Zona fuera del mapa
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Esta ruta no existe o se movió. Volvé al radar principal y buscá desde la navegación.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">
            Volver al inicio
          </Link>
          <Link href="/herramientas" className="btn btn-ghost">
            Ver herramientas
          </Link>
        </div>
      </div>
    </section>
  );
}