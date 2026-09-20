import type { Guide } from "@/content/types";

export const GUIDES: Guide[] = [
  {
    slug: "guia-nuevos-jugadores",
    title: "Guía para nuevos jugadores: tu primer mes",
    category: "Principiantes",
    date: "1 de agosto de 2026",
    readMinutes: 9,
    lead: "Del primer drop a la primera booyah: qué farmear, qué comprar, qué evitar y cómo no morir en los primeros tres minutos.",
    related: ["diamantes", "bermuda", "glosario"],
    sections: [
      {
        h: "Los primeros pasos",
        ordered: [
          "Jugá las partidas clásicas de entrenamiento con bots hasta dominar la cámara y la recolección.",
          "Configurá la sensibilidad con nuestro generador y probala 20 partidas antes de tocar nada.",
          "Elegí dos armas de cada rango (corto y medio) y quedate con ellas: la constancia gana al meta.",
          "Aprendé a leer el mapa: nuestra guía de Bermuda cubre las rotaciones básicas.",
        ],
      },
      {
        h: "Qué comprar y qué no",
        paragraphs: [
          "Empezá por Kelly y Antonio, gratuitos por registro. El farmeo de diamantes es lento: priorizá personajes de soporte como Moco antes que skins.",
          "Evitá cualquier venta de 'cuentas con diamantes' o 'diamantes por fuera de la tienda': son estafas casi siempre, y atentan contra las reglas del juego.",
        ],
        note: "Este portal no vende ni regala diamantes: ninguna promesa de recompensas reales sale de aquí.",
      },
      {
        h: "Los errores que más se pagan",
        list: [
          "Abrir fuego a los 10 segundos del drop: el sonido delata tu posición.",
          "Quedarse quieto con el inventario abierto en zona abierta.",
          "Guardar armas que no se usan: dos primarias medianas pierden contra una primaria + subfusil.",
          "Ignorar la zona y morir al borde: en los últimos círculos la rotación es la habilidad.",
        ],
      },
    ],
  },
  {
    slug: "comprar-diamantes-oficial",
    title: "Cómo comprar diamantes de forma oficial y segura",
    category: "Diamantes",
    date: "15 de julio de 2026",
    readMinutes: 6,
    lead: "Los diamantes solo se suman al juego por vías oficiales. Esto es lo que hay que saber para no perder plata ni cuenta.",
    related: ["estafas", "diamantes-calculadora", "diamantes-bonus"],
    sections: [
      {
        h: "Las vías oficiales",
        list: [
          "Dentro del juego: tienda de diamantes con pago por Google Play o App Store.",
          "Web oficial de recarga de Garena para tu región (la publicada en los canales oficiales).",
          "Puntos de recarga autorizados según país (tiendas que venden códigos oficiales).",
        ],
      },
      {
        h: "Señales de alerta",
        list: [
          "Precios muy por debajo de la tarifa oficial: es la herramienta de la estafa.",
          "Sitios que piden tu contraseña o tu ID para 'recargar': jamás compartas credenciales.",
          "Promesas de 'doblar' o 'generar' diamantes: no existe esa mecánica.",
          "Páginas que imitan el diseño oficial de Garena: verificá la URL exacta.",
        ],
        note: "Información verificada: 15/07/2026. Los métodos de pago y regiones cambian; consultá siempre la tienda del juego.",
      },
    ],
  },
  {
    slug: "estafas-diamantes-gratis",
    title: "Cómo conseguir diamantes gratis (métodos que sí funcionan)",
  category: "Trucos y Tips",
  date: "20 de julio de 2026",
  readMinutes: 6,
  lead: "Existen métodos legítimos para obtener diamantes gratis sin caer en estafas. Te mostramos las formas reales de conseguirlos.",
  related: ["comprar-diamantes-oficial", "faq"],
  sections: [
    {
      h: "Métodos efectivos para diamantes gratis",
      paragraphs: [
        "A diferencia de las estafas, existen formas legítimas dentro del juego para obtener diamantes sin gastar dinero. Estas estrategias son aprobadas por los desarrolladores y realmente funcionan.",
      ],
      list: [
        "Eventos especiales: participa en eventos temporales que regalan diamantes como recompensa.",
        "Misiones diarias: completa las tareas diarias que acumulan diamantes gradualmente.",
        "Logros y desafíos: desbloquea logros específicos que incluyen recompensas de diamantes.",
        "Programas de referidos: invita a amigos y ambos reciben diamantes cuando se registran.",
      ],
    },
    {
      h: "La verdad sobre los generadores",
      paragraphs: [
        "",
        ],
      },
    ],
  },
  {
    slug: "canjear-codigos",
    title: "Cómo canjear un código paso a paso",
    category: "Códigos",
    date: "18 de julio de 2026",
    readMinutes: 4,
    lead: "Los códigos oficiales se canjean en la web o en el juego, nunca en sitios de terceros. Guía completa con los errores típicos.",
    related: ["codigos", "estafas"],
    sections: [
      {
        h: "El procedimiento",
        ordered: [
          "Entrá al sitio de canje oficial de Free Fire para tu región (enlace publicado por los canales oficiales).",
          "Iniciá sesión con tu cuenta del juego: es la misma de siempre.",
          "Pegá el código en el campo, sin espacios.",
          "Confirmá y revisá tu bandeja de entrada dentro del juego.",
        ],
      },
      {
        h: "Por qué no canjea",
        list: [
          "El código está vencido: los códigos caducan en horas o días.",
          "La región del código no es tu región.",
          "Ya canjeaste ese código: son de un solo uso.",
          "Lo escribiste con caracteres parecidos pero distintos (O vs 0, I vs 1).",
        ],
      },
    ],
  },
  {
    slug: "advance-server",
    title: "Free Fire Advance Server: qué es y cómo probarlo",
    category: "Comunidad",
    date: "22 de julio de 2026",
    readMinutes: 5,
    lead: "El servidor de pruebas por tiempo limitado: cómo entrar, qué esperar y por qué no conviene usarlo para 'farmear'.",
    related: ["nuevos-jugadores", "noticias"],
    sections: [
      {
        h: "Qué es",
        paragraphs: [
          "Es una versión de prueba separada del juego principal que Garena abre en ventanas cortas. Sirve para testear armas, personajes y mecánicas nuevas antes del lanzamiento y reportar errores.",
        ],
      },
      {
        h: "Cómo se consigue la entrada",
        paragraphs: [
          "Las entradas se asignan por orden de llegada o sorteo en cada campaña, siempre anunciada en canales oficiales. Se descarga como APK/versión aparte; no se actualiza sola tu cuenta principal.",
          "Importante: lo que pasa ahí no se transfiere. No gastes tiempo intentando 'sacar ventaja' para tu cuenta principal.",
        ],
        note: "Condiciones vigentes a 16/08/2026; cada campaña cambia el proceso.",
      },
    ],
  },
  {
    slug: "estrategia-bermuda",
    title: "Estrategia en Bermuda: rotaciones y zonas calientes",
    category: "Mapas",
    date: "25 de julio de 2026",
    readMinutes: 7,
    lead: "El clásico mapa se gana entendiendo sus tres anillos: drops calientes, zona media y bombas finales. Guía de rotación para escuadra y solo.",
    related: ["purgatorio", "nuevos-jugadores"],
    sections: [
      {
        h: "La lógica de tres fases",
        paragraphs: [
          "Bermuda premia a quien rota con la zona, no a quien se queda atrincherado. En la primera fase, caé en zonas con loot doble pero no al centro caliente si tu equipo no está coordinado.",
        ],
        list: [
          "Fase 1: drop periférico + kill de botín y dos mejores armas.",
          "Fase 2: pegarse a la zona como goma, entrando por el lado limpio.",
          "Fase 3: posiciones altas y paredes: la ventaja de altura decide los últimos duelos.",
        ],
      },
      {
        h: "Los puntos calientes",
        paragraphs: [
          "Los nombres de los barrios cambiaron entre parches; lo importante es la lógica: las zonas con más loot concentrado tienen más gente. Si vas a caer ahí, caé con la primera pistola y peleá con la ventaja del sonido.",
        ],
      },
    ],
  },
  {
    slug: "estrategia-purgatorio",
    title: "Estrategia en Purgatorio: altura y agua",
    category: "Mapas",
    date: "27 de julio de 2026",
    readMinutes: 6,
    lead: "El mapa más vertical del juego: cada pelea se decide a favor del que llega arriba primero.",
    related: ["bermuda", "kalahari"],
    sections: [
      {
        h: "La verticalidad lo es todo",
        paragraphs: [
          "Purgatorio tiene desniveles constantes y agua que ralentiza. Cruzar agua a cielo abierto es la jugada que más veces se paga. Rotá por los puentes y las alturas.",
        ],
      },
      {
        h: "Armas recomendadas aquí",
        list: [
          "Subfusil o escopeta para las escaleras y techos.",
          "Fusil de precisión para controlar puentes.",
          "Evitá el rifle de francotirador como arma principal en este mapa: hay pocos pasillos largos.",
        ],
      },
    ],
  },
  {
    slug: "estrategia-kalahari",
    title: "Estrategia en Kalahari: desierto y visibilidad",
    category: "Mapas",
    date: "29 de julio de 2026",
    readMinutes: 6,
    lead: "Zonas abiertas, poca cobertura y casas pesadas conviven en el mapa del desierto. La paciencia rinde más que el drop agresivo.",
    related: ["alpine", "tier-list-armas"],
    sections: [
      {
        h: "Cómo jugarlo",
        paragraphs: [
          "Kalahari castiga cruzar a campo abierto: el francotirador tiene su paraíso y el móvil, su pesadilla. Jugá por las construcciones y usá los vehículos como escudo móvil.",
        ],
        list: [
          "Priorizá miras 4x si no tenés franco: el rango manda.",
          "Un jeep en movimiento vale oro en los últimos círculos.",
          "No persigas bajas a campo abierto: el tercer equipo te caza.",
        ],
      },
    ],
  },
  {
    slug: "estrategia-alpine",
    title: "Estrategia en Alpine: nieve y separación",
    category: "Mapas",
    date: "31 de julio de 2026",
    readMinutes: 6,
    lead: "El mapa nevado juega en dos tiempos: silencio total al caer y explosión de tamaño en el final. Cómo sobrevivir a ambos.",
    related: ["kalahari", "purgatorio"],
    sections: [
      {
        h: "La nieve es ruido",
        paragraphs: [
          "Alpine es un mapa de separación: pocos puntos de encuentro y mucha cobertura visual. Guardá el sonido: en la nieve cada paso se escucha doble.",
        ],
      },
      {
        h: "El final de partida",
        paragraphs: [
          "Los últimos círculos suelen cerrarse en terreno irregular. La combinación de pared gloo + posición alta es la receta, como en el resto de mapas, pero aquí el vehículo pesa más para cortar distancias.",
        ],
      },
    ],
  },
  {
    slug: "graficos-y-rendimiento",
    title: "Gráficos y rendimiento: la config que sí importa",
    category: "Configuración",
    date: "3 de agosto de 2026",
    readMinutes: 5,
    lead: "Reducir efectos no es cobarde: es competitivo. La configuración gráfica óptima según tu gama de teléfono.",
    related: ["sensibilidad-gama", "diamantes-calculadora"],
    sections: [
      {
        h: "La prioridad es el FPS",
        paragraphs: [
          "En Free Fire la ventaja de ver antes al enemigo supera cualquier efecto visual. Bajá sombras y reflejos antes que sacrificar cuadros por segundo.",
        ],
        list: [
          "Gama baja: gráficos Mínimos, FPS 30 forzados y sombras apagadas.",
          "Gama media: Estándar, FPS 60, desenfoque apagado.",
          "Gama alta: Alto solo si el teléfono no se calienta; si baja los FPS en peleas, bajá un nivel.",
        ],
        note: "Recomendaciones generales verificadas a 16/08/2026; cada equipo y parche es un caso aparte.",
      },
    ],
  },
  {
    slug: "rewards-y-booyah-pass",
    title: "Free Fire Rewards y Booyah Pass al día",
    category: "Pases",
    date: "6 de agosto de 2026",
    readMinutes: 5,
    lead: "Maximizá tu pase sin gastar de más: qué recompensas dan valor real y qué conviene dejar pasar.",
    related: ["diamantes-oficial", "eventos"],
    sections: [
      {
        h: "Cómo funciona el pase",
        paragraphs: [
          "El Booyah Pass avanza con misiones semanales y partidas. El pago desbloquea la vía de recompensas premium; la vía gratuita sigue siendo útil para cosméticos menores.",
        ],
      },
      {
        h: "Cuándo conviene comprarlo",
        list: [
          "Si vas a completar más del 80% de las misiones, el pase se paga solo en diamantes devueltos.",
          "Si juegas poco, esperá a la próxima temporada: los diamantes devueltos importan.",
          "Los eventos de 'recompensa doble' oficiales son la única vía de descuento real.",
        ],
      },
    ],
  },
  {
    slug: "ff-vs-max",
    title: "Free Fire vs Free Fire MAX: cuál instalar",
    category: "Comparativas",
    date: "8 de agosto de 2026",
    readMinutes: 5,
    lead: "Mismo juego, otra capa técnica: comparamos requisitos, calidad y cuándo la versión MAX tiene sentido real.",
    related: ["graficos-y-rendimiento", "requisitos"],
    sections: [
      {
        h: "La diferencia en una línea",
        paragraphs: [
          "Free Fire MAX es la misma cuenta y los mismos servidores con gráficos superiores y más exigencia técnica. No hay ventaja competitiva por jugar MAX: la ventaja está en la fluidez de tu equipo.",
        ],
      },
      {
        h: "Cuándo elegir cada una",
        list: [
          "Teléfono de gama baja o media: Free Fire estándar, gráficos Mínimos/Estándar.",
          "Teléfono de gama alta y pantalla de 90/120 Hz: MAX para aprovechar el hardware.",
          "Si MAX te da caídas de FPS, volvé al estándar: ver mejor peor no sirve.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export const GUIDE_META: Record<string, { h: string; label: string; href: string }> = {
  diamantes: { h: "cómo comprar diamantes de forma oficial", label: "Comprar diamantes oficial", href: "/guias/comprar-diamantes-oficial" },
  estafas: { h: "cómo detectar estafas de diamantes gratis", label: "Detectar estafas", href: "/guias/estafas-diamantes-gratis" },
  "diamantes-calculadora": { h: "calculadora de diamantes", label: "Calculadora de diamantes", href: "/herramientas/diamantes/calculadora" },
  "diamantes-bonus": { h: "bonificación por recarga", label: "Calculadora de bonificación", href: "/herramientas/diamantes/bonificacion" },
  bermuda: { h: "estrategia en Bermuda", label: "Estrategia Bermuda", href: "/guias/estrategia-bermuda" },
  purgatorio: { h: "estrategia en Purgatorio", label: "Estrategia Purgatorio", href: "/guias/estrategia-purgatorio" },
  kalahari: { h: "estrategia en Kalahari", label: "Estrategia Kalahari", href: "/guias/estrategia-kalahari" },
  alpine: { h: "estrategia en Alpine", label: "Estrategia Alpine", href: "/guias/estrategia-alpine" },
  "nuevos-jugadores": { h: "guía para nuevos jugadores", label: "Primer mes", href: "/guias/guia-nuevos-jugadores" },
  codigos: { h: "códigos de canje actuales", label: "Códigos", href: "/codigos" },
  "tier-list-armas": { h: "tier list de armas", label: "Tier list de armas", href: "/herramientas/tier-lists" },
  eventos: { h: "calendario de eventos", label: "Eventos", href: "/eventos" },
  requisitos: { h: "requisitos del dispositivo", label: "Requisitos", href: "/herramientas/requisitos" },
  "sensibilidad-gama": { h: "sensibilidad por gama", label: "Sensibilidad por gama", href: "/herramientas/sensibilidad/gama" },
  glosario: { h: "glosario de términos", label: "Glosario", href: "/glosario" },
  faq: { h: "preguntas frecuentes", label: "FAQ", href: "/faq" },
  noticias: { h: "noticias del portal", label: "Noticias", href: "/noticias" },
};