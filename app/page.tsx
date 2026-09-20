import Link from "next/link";
import type { ComponentType } from "react";
import { Gauge, Coins, Crosshair, Calculator, SlidersHorizontal, Lightning, ArrowsLeftRight, Trophy, BookOpen } from "@phosphor-icons/react/dist/ssr";
import BlurText from "@/components/BlurText";
import FadingVideo from "@/components/FadingVideo";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { SectionTitle } from "@/components/SectionTitle";
import { AdSlot } from "@/components/AdSlot";
import { DisclaimerBlock } from "@/components/DisclaimerBlock";
import { meta } from "@/lib/meta";
import { NEWS } from "@/content/news";
import { GUIDES } from "@/content/guides";
import { EVENTS, EVENTS_VERIFIED } from "@/content/events";
import { ACTIVE_CODES, CODES_VERIFIED } from "@/content/codes";
import { ALL_TOOL_LINKS } from "@/lib/nav";
import { CHARACTERS } from "@/content/characters";
import { WEAPONS } from "@/content/weapons";
import { PETS } from "@/content/pets";

export const metadata = meta(
  "FREE FIRE · Portal de Free Fire",
  "Sensibilidad, códigos, personajes, armas y guías de Free Fire en español.",
  "/"
);

const stats = [
  { label: "Herramientas interactivas", value: ALL_TOOL_LINKS.length },
  { label: "Guías originales", value: GUIDES.length },
  { label: "Fichas de personajes", value: CHARACTERS.length },
  { label: "Fichas de armas", value: WEAPONS.length },
  { label: "Mascotas fichadas", value: PETS.length },
  { label: "Códigos activos verificados", value: ACTIVE_CODES.length },
];

const quickLinks = [
  { href: "/herramientas/sensibilidad/generador", label: "Generador de sensibilidad", note: "por dispositivo, DPI y FPS" },
  { href: "/herramientas/buscar-jugador", label: "Simulador de recarga", note: "educativo · espera con barra de progreso" },
  { href: "/herramientas/comparadores/armas", label: "Comparador de armas", note: "daño, cadencia, cargador" },
  { href: "/herramientas/generadores/nombres", label: "Nombres con símbolos", note: "nicknames decorados" },
  { href: "/codigos", label: "Códigos de canje", note: "con fecha de verificación" },
  { href: "/herramientas/calculadoras/dano", label: "Daño arma + personaje", note: "número a número" },
];

const heroModules = [
  {
    title: "Generador de Sensibilidad",
    desc: "DPI / FPS / dispositivo. Afiná la mira por gama de teléfono sin tocar archivos.",
    href: "/herramientas/sensibilidad/generador",
    icon: Gauge,
    kind: "Configurador",
  },
  {
    title: "Simulador de Eventos & Códigos",
    desc: "Calendario de eventos y canje de códigos verificados, con fecha de revisión visible.",
    href: "/codigos",
    icon: Coins,
    kind: "Simulador",
  },
  {
    title: "Comparador de Armas & Stats",
    desc: "Armas y personajes lado a lado, número a número, con el meta actual.",
    href: "/herramientas/comparadores/armas",
    icon: Crosshair,
    kind: "Comparador",
  },
];

type ToolItem = { label: string; href: string; kind: string };

const toolHubGroups: Array<{
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  items: ToolItem[];
}> = [
  {
    title: "Sensibilidad & Control",
    desc: "Afiná la mira al milímetro por dispositivo, DPI, FPS y gama de teléfono.",
    icon: Gauge,
    items: [
      { label: "Generador por DPI", href: "/herramientas/sensibilidad/generador", kind: "Configurador" },
      { label: "Config para headshot", href: "/herramientas/sensibilidad/headshot", kind: "Configurador" },
      { label: "Por gama de teléfono", href: "/herramientas/sensibilidad/gama", kind: "Configurador" },
      { label: "Antes / después", href: "/herramientas/sensibilidad/comparador", kind: "Comparador" },
      { label: "Ajustes de gráficos", href: "/herramientas/ajustes-graficos", kind: "Guía" },
    ],
  },
  {
    title: "Economía & Diamantes",
    desc: "Compará recargas, simulá aperturas y calculá bonificaciones. Transparente.",
    icon: Coins,
    items: [
      { label: "Calculadora de diamantes", href: "/herramientas/diamantes/calculadora", kind: "Calculadora" },
      { label: "Comparador de recargas", href: "/herramientas/diamantes/comparador-recargas", kind: "Comparador" },
      { label: "Simulador de recarga", href: "/herramientas/buscar-jugador", kind: "Simulador" },
      { label: "Simulador de apertura", href: "/herramientas/diamantes/simulador", kind: "Simulador" },
      { label: "Bonificación por recarga", href: "/herramientas/diamantes/bonificacion", kind: "Calculadora" },
    ],
  },
  {
    title: "Identidad & Estilo",
    desc: "Nombres, bios, clanes y retos con símbolos para destacar en la sala.",
    icon: BookOpen,
    items: [
      { label: "Nombres con símbolos", href: "/herramientas/generadores/nombres", kind: "Generador" },
      { label: "Bios de perfil", href: "/herramientas/generadores/bios", kind: "Generador" },
      { label: "Clanes y escuadras", href: "/herramientas/generadores/clanes", kind: "Generador" },
      { label: "Retos para la sala", href: "/herramientas/generadores/retos", kind: "Generador" },
      { label: "Combinaciones", href: "/herramientas/generadores/combinaciones", kind: "Generador" },
    ],
  },
  {
    title: "Arsenal & Meta",
    desc: "Comparadores de armas, personajes, mascotas y tier lists actualizadas.",
    icon: Crosshair,
    items: [
      { label: "Comparador de armas", href: "/herramientas/comparadores/armas", kind: "Comparador" },
      { label: "Comparador de personajes", href: "/herramientas/comparadores/personajes", kind: "Comparador" },
      { label: "Mascotas y vehículos", href: "/herramientas/comparadores/mascotas", kind: "Comparador" },
      { label: "Tier lists del meta", href: "/herramientas/tier-lists", kind: "Ranking" },
      { label: "Daño arma + personaje", href: "/herramientas/calculadoras/dano", kind: "Calculadora" },
    ],
  },
];

const KIND_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Calculadora: Calculator,
  Simulador: SlidersHorizontal,
  Generador: Lightning,
  Comparador: ArrowsLeftRight,
  Ranking: Trophy,
  Guía: BookOpen,
};

function KindIcon({ kind }: { kind: string }) {
  const Icon = KIND_ICONS[kind] ?? BookOpen;
  return <Icon className="h-5 w-5 text-alert" aria-hidden="true" />;
}

export default function Home() {
  return (
    <div className="radar-bg">
      {/* ---------- Hero: apertura cinematográfica ---------- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -10%, color-mix(in srgb, var(--color-alert) 15%, transparent), transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="tac-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <FadingVideo src={process.env.NEXT_PUBLIC_HERO_VIDEO} />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-16 md:pb-20 md:pt-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center md:text-left">
              <p className="chip mx-auto md:mx-0">
                <span className="chip-dot" aria-hidden="true" />
                señal en vivo · datos verificados hoy
              </p>
              <BlurText
                text="Centro de Inteligencia y Simulación Táctica FF"
                accent={["Inteligencia", "Táctica"]}
                as="h1"
                className="font-display mx-auto mt-7 max-w-2xl text-4xl uppercase leading-[1.1] tracking-wide text-bone text-balance md:mx-0 md:text-5xl xl:text-6xl"
              />
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted md:mx-0 md:text-lg">
                Herramientas de sensibilidad, calculadoras de diamantes, comparadores de armas y
                datos 100% verificados sin promesas falsas.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link href="/herramientas" className="btn btn-solid btn-lg">
                  Entrar a las herramientas
                </Link>
                <Link href="/guias" className="btn btn-ghost btn-lg">
                  Leer las guías
                </Link>
              </div>
              <p className="mt-6 text-xs uppercase tracking-widest text-faint">
                {ALL_TOOL_LINKS.length} módulos · sin promesas de recompensas
              </p>
            </div>
          </Reveal>

          {/* ---------- Tarjetas de estado rápido ---------- */}
          <Reveal delay={120}>
            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
              {heroModules.map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  className="liquid-glass-strong corner-coords group block rounded-3xl p-6 transition-transform duration-350 ease-out hover:-translate-y-1.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="glass-icon">
                      <m.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="chip" aria-hidden="true">
                      <span className="chip-dot" />
                      {m.kind}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-xl uppercase leading-tight tracking-wide text-bone transition-colors group-hover:text-alert">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{m.desc}</p>
                  <p className="tabular mt-6 text-xs uppercase tracking-widest text-alert transition-colors group-hover:text-bone">
                    Abrir módulo →
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* ---------- Banda de estadísticas ---------- */}
          <Reveal delay={160}>
            <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {stats.map((s) => (
                <div key={s.label} className="liquid-glass flex flex-col rounded-2xl p-5">
                  <dt className="order-2 mt-1.5 text-[0.68rem] uppercase leading-snug tracking-widest text-faint">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-display text-3xl text-warn">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <AdSlot className="mx-auto w-full max-w-6xl px-4" />

      {/* ---------- 01 · Accesos rápidos ---------- */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <Reveal>
          <SectionTitle index="01" title="Herramientas más usadas" sub="Lógica real en el cliente, sin promesas de recompensas." />
        </Reveal>
        <Reveal delay={80}>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickLinks.map((q, i) => (
              <li key={q.href}>
                <Link href={q.href} className="group tile flex h-full items-start gap-4">
                  <span className="tabular pt-0.5 text-sm text-alert">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-bold text-bone transition-colors group-hover:text-alert">
                      {q.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{q.note}</span>
                  </span>
                  <span
                    className="ml-auto self-center text-muted transition-transform duration-250 ease-out group-hover:translate-x-1 group-hover:text-alert"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ---------- 02 · Hub de herramientas ---------- */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <Reveal>
          <SectionTitle index="02" title="Hub de herramientas" sub="Cuatro sectores; cada módulo con su propia lógica y datos reales." />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {toolHubGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 60}>
              <div className="rounded-3xl border border-line bg-ink2/60 p-6">
                <div className="flex items-center gap-3">
                  <span className="glass-icon">
                    <g.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-wide text-bone">
                      {g.title}
                    </h3>
                    <p className="tabular text-xs uppercase tracking-widest text-faint">
                      {g.items.length} módulos
                    </p>
                  </div>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{g.desc}</p>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        className="group tool-card tile relative flex h-full flex-col gap-3 p-5"
                      >
                        <span className="tabular absolute right-4 top-4 text-[0.6rem] uppercase tracking-widest text-radar">
                          {i.kind}
                        </span>
                        <KindIcon kind={i.kind} />
                        <span className="mt-2 block text-sm font-bold leading-snug text-bone transition-colors group-hover:text-alert">
                          {i.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- 03 · Noticias ---------- */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <Reveal>
          <SectionTitle index="03" title="Últimas noticias" sub="Editorial propio: análisis, método y comunidad." />
        </Reveal>
        <Reveal delay={80}>
          <ul className="space-y-2.5">
            {NEWS.slice(0, 3).map((n, i) => (
              <li key={n.slug}>
                <Link href={`/noticias/${n.slug}`} className="group tile flex items-baseline gap-4">
                  <span className="tabular text-sm text-alert">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-bold text-bone transition-colors group-hover:text-alert">
                      {n.title}
                    </span>
                    <span className="tabular mt-1 block text-xs text-faint">{n.date} · {n.category}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-muted transition-transform duration-250 ease-out group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------- 04 · Códigos y eventos ---------- */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <Reveal>
          <SectionTitle index="04" title="Radar de códigos y eventos" sub="Solo lo verificado, con fecha visible. Nada inventado." />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="liquid-glass rounded-3xl p-7">
              <p className="flex items-center gap-2">
                <span className="hud-tick" aria-hidden="true" />
                <span className="tabular text-xs uppercase tracking-widest text-alert">códigos de canje</span>
              </p>
              <p className="mt-3 font-display text-4xl text-warn">
                <CountUp value={ACTIVE_CODES.length} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {ACTIVE_CODES.length === 0
                  ? "Sin códigos activos verificados hoy. Cuando aparezcan, se publican aquí con su fecha. Ningún sitio honrado puede garantizarte diamantes."
                  : "Códigos verificados publicados con fecha y vigencia."}
              </p>
              <p className="tabular mt-3 text-xs text-faint">última verificación: {CODES_VERIFIED}</p>
              <Link href="/codigos" className="btn btn-ghost mt-5">Ver códigos</Link>
            </div>
            <div className="liquid-glass rounded-3xl p-7">
              <p className="flex items-center gap-2">
                <span className="hud-tick" aria-hidden="true" />
                <span className="tabular text-xs uppercase tracking-widest text-alert">eventos</span>
              </p>
              <ul className="mt-4 space-y-2.5">
                {EVENTS.filter((e) => e.status !== "Finalizado").map((e) => (
                  <li key={e.slug} className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2.5 text-sm">
                    <span className="text-bone">{e.title}</span>
                    <span className={`tabular shrink-0 text-xs ${e.status === "Confirmado" ? "text-radar" : "text-warn"}`}>
                      {e.status}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="tabular mt-3 text-xs text-faint">verificado: {EVENTS_VERIFIED}</p>
              <Link href="/eventos" className="btn btn-ghost mt-5">Ver calendario</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- 05 · Guías destacadas ---------- */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:pb-16">
        <Reveal>
          <SectionTitle index="05" title="Guías destacadas" sub="Estrategias por mapa, compras seguras y configuración." />
        </Reveal>
        <Reveal delay={80}>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {GUIDES.slice(0, 3).map((g, i) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className="group tile h-full">
                  <span className="tabular text-xs text-alert">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-2.5 block font-bold text-bone transition-colors group-hover:text-alert">
                    {g.title}
                  </span>
                  <span className="mt-2.5 block text-sm leading-relaxed text-muted line-clamp-3">{g.lead}</span>
                  <span className="tabular mt-4 block text-[0.68rem] uppercase tracking-widest text-faint">
                    {g.readMinutes} min · {g.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <Reveal>
          <DisclaimerBlock />
        </Reveal>
      </section>
    </div>
  );
}
