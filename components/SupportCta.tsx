import Link from "next/link";
import { RadarMark } from "@/components/RadarMark";
import { SUPPORT_ENABLED } from "@/lib/support";

export function SupportCta({ className = "" }: { className?: string }) {
  if (!SUPPORT_ENABLED) return null;
  return (
    <section className={className}>
      <Link href="/apoya" className="hud-corners group flex items-center gap-4 border border-line bg-surface p-5 md:items-center md:p-6">
        <RadarMark className="h-10 w-10 shrink-0 text-alert md:h-12 md:w-12" />
        <div className="min-w-0">
          <p className="tabular text-xs uppercase tracking-[0.25em] text-radar">
            apoya el proyecto
          </p>
          <p className="font-display mt-1 text-xl uppercase text-bone group-hover:text-warn md:text-2xl">
            Mantener esto gratis, cuesta poco
          </p>
          <p className="mt-1 text-sm text-muted">
            Donaciones, enlaces de compra y marcas amigas financian el portal. Ver cómo apoyar →
          </p>
        </div>
      </Link>
    </section>
  );
}