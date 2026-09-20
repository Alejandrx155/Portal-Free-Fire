"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type HubItem = { label: string; href: string; note?: string; icon: string };
type HubGroup = { label: string; emoji: string; items: HubItem[] };

const TRENDING: HubItem[] = [
  { icon: "💎", label: "Simulador de recarga", href: "/herramientas/buscar-jugador", note: "educativo · nombre real del ID vía API" },
  { icon: "👻", label: "Espacio invisible", href: "/herramientas/generadores/espacio-invisible", note: "nick sin nombre visible" },
  { icon: "✨", label: "Nicks con símbolos", href: "/herramientas/generadores/nombres", note: "más de 8,000 adornos" },
  { icon: "🎨", label: "Bio colorida", href: "/herramientas/bios", note: "códigos hex con vista previa en vivo" },
  { icon: "🎮", label: "Sensi y DPI", href: "/herramientas/sensibilidad/generador", note: "por modelo de dispositivo" },
  { icon: "🔍", label: "Perfil y antigüedad por UID", href: "/herramientas/diamantes/jugador", note: "datos reales de la API comunitaria" },
  { icon: "✔️", label: "Verificado de V", href: "/herramientas/generadores/simbolos", note: "símbolos de verificado y marcas" },
];

const GROUPS: HubGroup[] = [
  {
    label: "Perfiles y jugadores",
    emoji: "👤",
    items: [
      { icon: "🆔", label: "Perfil de Free Fire por ID (UID)", href: "/herramientas/diamantes/jugador", note: "nombre real, rango, gremio, mascota · API" },
      { icon: "📅", label: "Antigüedad y fecha de creación", href: "/herramientas/perfiles/antiguedad", note: "dato real de la API" },
      { icon: "💬", label: "Visor de bio por ID", href: "/herramientas/perfiles/bio-por-id", note: "leé la firma pública del perfil" },
      { icon: "⭐", label: "IDs de ejemplo", href: "/herramientas/perfiles/ids-famosos", note: "probá con IDs documentados de la API" },
      { icon: "💎", label: "Sistema Prime / diamantes requeridos", href: "/herramientas/diamantes/jugador", note: "costo en diamantes de la API" },
      { icon: "🔎", label: "Buscador de jugadores por nick", href: "/herramientas/diamantes/jugador", note: "sin API pública confiable: buscá por ID" },
    ],
  },
  {
    label: "Nicks, letras y fuentes",
    emoji: "🅰️",
    items: [
      { icon: "✒️", label: "Creador de nicks", href: "/herramientas/generadores/nombres", note: "diseñador con símbolos integrados" },
      { icon: "✒️", label: "Decorador de nombres", href: "/herramientas/generadores/decorador", note: "tu nick intacto, decorado con símbolos" },
      { icon: "👥", label: "Nicks listos", href: "/herramientas/generadores/nick-tematicos", note: "femeninos, masculinos, parejas y fakes" },
      { icon: "🔤", label: "Fuentes Unicode", href: "/herramientas/fuentes-unicode", note: "letras pequeñas, apiladas y separadas" },
      { icon: "👻", label: "Espacio invisible", href: "/herramientas/generadores/espacio-invisible", note: "caracteres transparentes" },
      { icon: "🎴", label: "Símbolos especiales", href: "/herramientas/generadores/simbolos", note: "8,000+ adornos, marcas y asiáticos" },
    ],
  },
  {
    label: "Biografías",
    emoji: "📝",
    items: [
      { icon: "🎨", label: "Bio colorida", href: "/herramientas/bios", note: "generador con vista previa en vivo" },
      { icon: "📜", label: "Bios preparadas", href: "/herramientas/generadores/bios", note: "frases listas para copiar" },
      { icon: "💬", label: "Visor de bio por ID", href: "/herramientas/perfiles/bio-por-id", note: "bio real de la API" },
      { icon: "🏳️", label: "Banderas y códigos de color", href: "/herramientas/bios", note: "hex y banderas para la firma" },
    ],
  },
  {
    label: "Diamantes",
    emoji: "🧪",
    items: [
      { icon: "💎", label: "Recarga de diamantes", href: "/herramientas/buscar-jugador", note: " nombre real del ID " },
      { icon: "🕳️", label: "Generador de Diamantes", href: "/herramientas/simulador-estafas", note: "nombre real del ID" },
      { icon: "🎁", label: "Sobres de diamantes", href: "/herramientas/diamantes/simulador", note: "contexto real del ID por API" },
    ],
  },
  {
    label: "Jugabilidad",
    emoji: "🎮",
    items: [
      { icon: "📱", label: "Sensibilidad por dispositivo", href: "/herramientas/sensibilidad/generador", note: "según modelo y gama" },
      { icon: "🎯", label: "Config para headshot", href: "/herramientas/sensibilidad/headshot", note: "ajustes de precisión" },
      { icon: "📟", label: "DPI y gama de teléfono", href: "/herramientas/sensibilidad/gama", note: "equivalencias por hardware" },
      { icon: "🔄", label: "Comparador de sensis", href: "/herramientas/sensibilidad/comparador", note: "antes y después" },
      { icon: "🕹️", label: "Custom HUD", href: "/herramientas/huds", note: "2, 3, 4, 5 dedos y emulador" },
      { icon: "⚡", label: "Combos de habilidades", href: "/herramientas/generadores/combinaciones", note: "personajes, mascotas y armas" },
    ],
  },
  {
    label: "Guildas y clanes",
    emoji: "🛡️",
    items: [
      { icon: "🏰", label: "Nombres para guildas", href: "/herramientas/generadores/clanes", note: "generador de nombres y tags" },
      { icon: "🤝", label: "Reclutamiento y búsqueda de gremio", href: "/herramientas/generadores/clanes", note: "sin datos públicos confiables: generá tu tag" },
    ],
  },
  {
    label: "Catálogo y extras",
    emoji: "📦",
    items: [
      { icon: "🔫", label: "Catálogo de armas", href: "/armas", note: "fichas y estadísticas" },
      { icon: "🧑‍🚀", label: "Personajes", href: "/personajes", note: "habilidades y guías" },
      { icon: "🐾", label: "Mascotas", href: "/mascotas", note: "compañeros del juego" },
      { icon: "🚗", label: "Vehículos", href: "/vehiculos", note: "modelos y stats" },
      { icon: "🎟️", label: "Códigos de canje", href: "/codigos", note: "codiguin FF y cómo canjearlos" },
      { icon: "📥", label: "Cómo canjear códigos", href: "/codigos/canje", note: "paso a paso oficial" },
      { icon: "📆", label: "Eventos", href: "/eventos", note: "calendario de la comunidad" },
    ],
  },
];

export function HerramientasHub({ count }: { count: number }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return GROUPS.map((g) => ({
      group: g.label,
      items: g.items.filter((i) => `${i.label} ${i.note ?? ""}`.toLowerCase().includes(q)),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <header className="text-center">
        <p className="tabular text-xs uppercase tracking-widest text-alert">FREE FIRE · HERRAMIENTAS</p>
        <h1 className="font-display mt-3 text-4xl font-bold uppercase tracking-wide text-bone md:text-5xl">
          Herramientas
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          {count} herramientas con lógica real en el navegador. Los perfiles por ID usan la API comunitaria (datos
          reales); los simuladores están siempre marcados y no otorgan nada en el juego.
        </p>
      </header>

      <div className="mt-8">
        <input
          className="field"
          placeholder="Buscar herramienta…"
          aria-label="Buscar herramienta"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {q ? (
        results.length > 0 ? (
          <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-xl">
            <div className="border-b border-line px-4 py-2.5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-faint">
                Resultados de la búsqueda
              </span>
            </div>
            <ul className="divide-y divide-line/70">
              {results.flatMap((g) =>
                g.items.map((item) => (
                  <li key={`${g.group}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-raised/40 active:bg-raised/60"
                    >
                      <span className="text-lg" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-bone">{item.label}</span>
                        <span className="block truncate text-xs text-faint">{g.group}</span>
                      </span>
                      <span aria-hidden="true" className="text-muted">
                        ›
                      </span>
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </section>
        ) : (
          <p className="mt-8 text-sm text-faint">Sin resultados para «{query}».</p>
        )
      ) : (
        <>
          <section className="mt-10">
            <div className="mb-3 flex items-center gap-2">
              <span className="tabular text-xs uppercase tracking-widest text-faint">🔥 Tendencias de búsqueda</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TRENDING.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur-xl transition-colors hover:border-line2 hover:bg-raised/50"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {t.icon}
                  </span>
                  <span className="mt-2 block font-bold text-bone">{t.label}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-faint">{t.note}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-alert">
                    Abrir <span aria-hidden="true">›</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10 space-y-5">
            {GROUPS.map((g) => (
              <section
                key={g.label}
                className="overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                  <span aria-hidden="true">{g.emoji}</span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-faint">{g.label}</span>
                </div>
                <ul className="divide-y divide-line/70">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-raised/40 active:bg-raised/60"
                      >
                        <span className="text-lg" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-bone">{item.label}</span>
                          {item.note && <span className="block truncate text-xs text-faint">{item.note}</span>}
                        </span>
                        <span aria-hidden="true" className="text-muted">
                          ›
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}