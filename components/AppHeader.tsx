"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { RadarMark } from "@/components/RadarMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE } from "@/lib/site";
import { TOOLS_GROUPS, CONTENT_ITEMS } from "@/lib/nav";

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setPanel(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        const p = max > 0 ? el.scrollTop / max : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
        setScrolled(el.scrollTop > 12);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const pillCls =
    "inline-flex h-7 items-center whitespace-nowrap rounded-full px-2.5 text-xs font-medium text-muted transition-colors duration-200 hover:bg-[var(--nav-pill)] hover:text-bone data-[active=true]:bg-[var(--nav-pill)] data-[active=true]:text-bone";

  return (
    <header className="sticky top-4 z-40">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            "liquid-glass flex h-14 w-full items-center justify-between gap-2 rounded-full px-4 py-2 transition-shadow duration-300 md:gap-3 md:px-6",
            scrolled ? "shadow-[var(--shadow-md)]" : "shadow-[var(--shadow-xs)]"
          )}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-full pr-2 transition-transform duration-300 ease-out hover:-translate-y-0.5"
          >
            <RadarMark className="h-7 w-7 text-alert" />
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold uppercase leading-none tracking-wider text-bone">
                FREE <span className="text-alert">FIRE</span>
              </span>
              <span className="mt-0.5 whitespace-nowrap text-[9px] uppercase leading-none tracking-tight text-faint">
                {SITE.claim}
              </span>
            </div>
          </Link>

          <nav
            aria-label="Principal"
            className="hidden h-10 items-center gap-1 rounded-full bg-[var(--nav-tint)] px-3 lg:flex"
          >
            <Link href="/" data-active={isActive("/")} className={pillCls}>INICIO</Link>
            <div className="group relative">
              <Link href="/herramientas" data-active={isActive("/herramientas")} className={pillCls}>
                HERRAMIENTAS
              </Link>
              <div className="menu-panel absolute left-1/2 top-full z-50 mt-2 w-[min(36rem,calc(100vw_-_2rem))] -translate-x-1/2 border border-line bg-surface">
                <div className="flex gap-6 p-5">
                  {TOOLS_GROUPS.slice(0, 3).map((g) => (
                    <div key={g.label} className="min-w-0 flex-1">
                      <p className="tabular text-[0.65rem] uppercase tracking-widest text-alert">{g.label}</p>
                      <ul className="mt-2.5 space-y-1">
                        {g.items.slice(0, 5).map((i) => (
                          <li key={i.href}>
                            <Link href={i.href} className="block rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-bone">
                              {i.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line bg-ink2 p-3">
                  <Link href="/herramientas" className="block rounded-full px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-warn hover:text-bone">
                    Todas las herramientas →
                  </Link>
                </div>
              </div>
            </div>
            <div className="group relative">
              <Link href="/codigos" data-active={isActive("/codigos")} className={pillCls}>
                CODIGOS
              </Link>
              <div className="menu-panel absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 border border-line bg-surface">
                <ul className="space-y-1 p-3">
                  <li><Link href="/codigos" className="block rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-bone">Códigos activos</Link></li>
                  <li><Link href="/codigos/historial" className="block rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-bone">Historial de vencidos</Link></li>
                  <li><Link href="/codigos/canje" className="block rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-bone">Cómo canjear</Link></li>
                </ul>
              </div>
            </div>
            <div className="group relative">
              <Link href="/guias" data-active={isActive("/guias")} className={pillCls}>
                GUIAS
              </Link>
              <div className="menu-panel absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 border border-line bg-surface">
                <ul className="space-y-1 p-3">
                  {CONTENT_ITEMS.slice(1, 6).map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className="block rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-raised hover:text-bone">{i.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/noticias" data-active={isActive("/noticias")} className={pillCls}>Noticias</Link>
            <Link href="/eventos" data-active={isActive("/eventos")} className={pillCls}>Eventos</Link>
            <Link href="/cuenta" data-active={isActive("/cuenta")} className={pillCls}>Mi cuenta</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <span className="chip chip-sm hidden xl:inline-flex" title="Datos revisados con la fecha de hoy">
              <span className="chip-dot" aria-hidden="true" />
              Verificado hoy
            </span>
            <Link
              href="/herramientas/sensibilidad/generador"
              className="btn btn-solid hidden h-9 shrink-0 rounded-full px-4 text-xs md:inline-flex"
            >
              SENSIBILIDAD HACKER
            </Link>
            <ThemeToggle className="shrink-0" />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="btn btn-ghost h-8 w-8 min-w-8 shrink-0 justify-center p-0 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-all duration-250", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-all duration-250", open && "opacity-0")} />
                <span className={cn("absolute left-0 top-3 h-0.5 w-full rounded-full bg-current transition-all duration-250", open && "top-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!open}
        className={cn("menu-fade", open && "open")}
        onClick={() => setOpen(false)}
      />
      <div aria-hidden={!open} className={cn("menu-drawer", open && "open")}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="tabular text-xs uppercase tracking-[0.25em] text-alert">menú</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="btn btn-ghost h-9 w-9 justify-center p-0"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 space-y-2.5 overflow-y-auto p-4 pb-20">
            <Link href="/" onClick={() => setOpen(false)} className="tile text-center font-display text-xl uppercase text-bone">Inicio</Link>
            {TOOLS_GROUPS.map((g) => (
              <div key={g.label} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <button
                  type="button"
                  onClick={() => setPanel(panel === g.label ? null : g.label)}
                  aria-expanded={panel === g.label}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold uppercase tracking-wide text-bone"
                >
                  {g.label}
                  <span className={cn("tabular text-alert transition-transform duration-250", panel === g.label && "rotate-45")}>+</span>
                </button>
                {panel === g.label && (
                  <ul className="menu-acc border-t border-line">
                    {g.items.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-muted transition-colors hover:text-warn">
                          {i.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <button
                type="button"
                onClick={() => setPanel(panel === "Contenido" ? null : "Contenido")}
                aria-expanded={panel === "Contenido"}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold uppercase tracking-wide text-bone"
              >
                Contenido
                <span className={cn("tabular text-alert transition-transform duration-250", panel === "Contenido" && "rotate-45")}>+</span>
              </button>
              {panel === "Contenido" && (
                <ul className="menu-acc border-t border-line">
                  {CONTENT_ITEMS.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-muted transition-colors hover:text-warn">
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href="/cuenta" onClick={() => setOpen(false)} className="tile text-center font-display text-xl uppercase text-bone">Mi cuenta</Link>
            <p className="px-2 pt-4 text-xs leading-relaxed text-faint">{SITE.honesty}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
