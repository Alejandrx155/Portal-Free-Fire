export type NavItem = { label: string; href: string; note?: string };
export type NavGroup = { label: string; href: string; items: NavItem[] };

export const TOOLS_GROUPS: NavGroup[] = [
  {
    label: "PERFILES",
    href: "/herramientas/diamantes/jugador",
    items: [
      { label: "Perfil por ID (UID)", href: "/herramientas/diamantes/jugador", note: "datos reales de la API" },
      { label: "Antigüedad por UID", href: "/herramientas/perfiles/antiguedad", note: "fecha de creación" },
      { label: "Bio por ID", href: "/herramientas/perfiles/bio-por-id", note: "firma pública real" },
      { label: "IDs de ejemplo", href: "/herramientas/perfiles/ids-famosos", note: "probá con IDs de la API" },
    ],
  },
  {
    label: "DIAMANTES",
    href: "/herramientas/diamantes/calculadora",
    items: [
      { label: "Calculadora de diamantes", href: "/herramientas/diamantes/calculadora" },
      { label: "Simulador de apertura", href: "/herramientas/diamantes/simulador", note: "simulación" },
      { label: "Comparador de recargas", href: "/herramientas/diamantes/comparador-recargas" },
      { label: "Bonificación por recarga", href: "/herramientas/diamantes/bonificacion" },
      { label: "Buscar jugador por ID", href: "/herramientas/diamantes/jugador", note: "educativo · no oficial" },
      { label: "Simulador de estafas", href: "/herramientas/simulador-estafas", note: "concientización anti-estafa" },
    ],
  },
  {
    label: "SENSIBILIDAD",
    href: "/herramientas/sensibilidad/generador",
    items: [
      { label: "Generador de sensibilidad", href: "/herramientas/sensibilidad/generador" },
      { label: "Config para headshot", href: "/herramientas/sensibilidad/headshot" },
      { label: "Config por gama de teléfono", href: "/herramientas/sensibilidad/gama" },
      { label: "Comparador antes/después", href: "/herramientas/sensibilidad/comparador" },
      { label: "Ajustes de gráficos", href: "/herramientas/ajustes-graficos" },
    ],
  },
  {
    label: "GENERAR",
    href: "/herramientas/generadores/nombres",
    items: [
      { label: "Nombres", href: "/herramientas/generadores/nombres" },
      { label: "Decorador de nombres", href: "/herramientas/generadores/decorador" },
      { label: "Nicks temáticos", href: "/herramientas/generadores/nick-tematicos" },
      { label: "Fuentes Unicode", href: "/herramientas/fuentes-unicode" },
      { label: "Espacio invisible", href: "/herramientas/generadores/espacio-invisible" },
      { label: "Símbolos especiales", href: "/herramientas/generadores/simbolos" },
      { label: "Bios y color", href: "/herramientas/bios" },
      { label: "Bios de perfil", href: "/herramientas/generadores/bios" },
      { label: "Clanes y escuadras", href: "/herramientas/generadores/clanes" },
      { label: "Combos y combinaciones", href: "/herramientas/generadores/combinaciones" },
      { label: "HUDs de comunidad", href: "/herramientas/huds", note: "layout de botones" },
      { label: "Retos", href: "/herramientas/generadores/retos" },
      { label: "Clave de sala", href: "/herramientas/generadores/clave-sala" },
      { label: "Simulador de recarga", href: "/herramientas/buscar-jugador", note: "educativo · nombre real vía API" },
    ],
  },
  {
    label: "COMPARAR",
    href: "/herramientas/comparadores/armas",
    items: [
      { label: "Armas", href: "/herramientas/comparadores/armas" },
      { label: "Personajes", href: "/herramientas/comparadores/personajes" },
      { label: "Mascotas", href: "/herramientas/comparadores/mascotas" },
      { label: "Vehículos", href: "/herramientas/comparadores/vehiculos" },
      { label: "FF vs FF MAX", href: "/herramientas/comparadores/ff-vs-max" },
      { label: "Tier lists del meta", href: "/herramientas/tier-lists" },
    ],
  },
  {
    label: "CALCULADORA",
    href: "/herramientas/calculadoras/nivel",
    items: [
      { label: "Nivel y experiencia", href: "/herramientas/calculadoras/nivel" },
      { label: "Rango (elo) estimado", href: "/herramientas/calculadoras/elo" },
      { label: "Daño arma + personaje", href: "/herramientas/calculadoras/dano" },
      { label: "Requisitos del dispositivo", href: "/herramientas/requisitos" },
      { label: "Estado del servidor", href: "/herramientas/servidor" },
    ],
  },
];

export const CONTENT_ITEMS: NavItem[] = [
  { label: "Noticias", href: "/noticias" },
  { label: "Guías", href: "/guias" },
  { label: "Personajes", href: "/personajes" },
  { label: "Armas", href: "/armas" },
  { label: "Mascotas", href: "/mascotas" },
  { label: "Vehículos", href: "/vehiculos" },
  { label: "Eventos", href: "/eventos" },
  { label: "Códigos de canje", href: "/codigos" },
  { label: "FAQ", href: "/faq" },
  { label: "Glosario", href: "/glosario" },
  { label: "Acerca de", href: "/acerca" },
  { label: "Apoya el proyecto", href: "/apoya" },
];

export const ALL_TOOL_LINKS: NavItem[] = [
  ...TOOLS_GROUPS.flatMap((g) => g.items.map((i) => ({ label: `${g.label}: ${i.label}`, href: i.href }))),
];