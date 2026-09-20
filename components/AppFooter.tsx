import Link from "next/link";
import { RadarMark } from "@/components/RadarMark";
import { SITE } from "@/lib/site";
import { TOOLS_GROUPS, CONTENT_ITEMS } from "@/lib/nav";

export default function AppFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-ink2">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <RadarMark className="h-7 w-7 text-alert" />
            <span className="font-display text-lg uppercase tracking-widest text-bone">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{SITE.claim}.</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-faint">{SITE.honesty}</p>
        </div>
        <nav aria-label="Herramientas">
          <p className="tabular text-[0.65rem] uppercase tracking-widest text-alert">Herramientas</p>
          <ul className="mt-3.5 space-y-2">
            {TOOLS_GROUPS.map((g) => (
              <li key={g.label}>
                <Link href={g.href} className="text-sm text-muted transition-colors hover:text-bone">
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Contenido">
          <p className="tabular text-[0.65rem] uppercase tracking-widest text-alert">Contenido</p>
          <ul className="mt-3.5 space-y-2">
            {CONTENT_ITEMS.slice(0, 7).map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-sm text-muted transition-colors hover:text-bone">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="tabular text-[0.65rem] uppercase tracking-widest text-alert">Información</p>
          <ul className="mt-3.5 space-y-2">
            {CONTENT_ITEMS.slice(7).map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-sm text-muted transition-colors hover:text-bone">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/herramientas" className="text-sm text-muted transition-colors hover:text-bone">
                INDICE DE HERRAMIENTAS
              </Link>
            </li>
          </ul>
          <p className="chip mt-6">
            <span className="chip-dot" aria-hidden="true" />
            Actualizado: {SITE.updated}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-faint">{SITE.independence}</p>
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {SITE.name} · Proyecto educativo de fans · Sin promesas de recompensas.
          </p>
        </div>
      </div>
    </footer>
  );
}
