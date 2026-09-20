import type { NewsItem } from "@/content/types";

export const NEWS: NewsItem[] = [
  {
    slug: "avance-server-que-probar",
    title: "Advance Server: qué probar y cómo entrar",
    category: "Comunidad",
    date: "12 de agosto de 2026",
    readMinutes: 4,
    lead: "El servidor de pruebas de Free Fire abre ventanas con cupos limitados. Si conseguís lugar, esto es lo que conviene testear y reportar.",
    sections: [
      {
        h: "Qué es el Advance Server",
        paragraphs: [
          "Es un servidor de pruebas que Garena abre por períodos cortos para que la comunidad pruebe contenido nuevo antes del lanzamiento. Entrar no garantiza recompensas: la gracia es reportar bugs y dar feedback.",
          "Los cupos se asignan por orden de llegada o por invitación, según la campaña. No existe forma oficial garantizada de 'entrar siempre'.",
        ],
      },
      {
        h: "Qué probar y cómo reportar",
        list: [
          "Probá las armas nuevas en rango cercano y lejano, y comparalas con tu habitual.",
          "Anotá cualquier caída de FPS o bug de sonido; el reporte detallado vale más que uno genérico.",
          "Capturá video donde se vea el problema y el paso exacto para reproducirlo.",
          "No uses el servidor de pruebas para 'farmear' recompensas: los datos de prueba no se transfieren.",
        ],
      },
      {
        h: "De dónde sale esta información",
        paragraphs: [
          "Los anuncios oficiales se publican en los canales de Garena Free Fire. Este resumen es nuestra interpretación editorial; los detalles de cada ventana cambian entre campañas.",
        ],
        note: "Verificado: 12 de agosto de 2026. Antes de intentar entrar, revisá los canales oficiales por las condiciones vigentes.",
      },
    ],
  },
  {
    slug: "que-es-el-meta-ahora",
    title: "El meta actual, explicado con datos del sitio",
    category: "Análisis editorial",
    date: "10 de agosto de 2026",
    readMinutes: 5,
    lead: "Alok sigue mandando, pero el cuerpo a cuerpo con MP40 y la precisión de la AWM definen las partidas más que nunca. Esta es nuestra lectura del meta, con la fecha de cada dato.",
    sections: [
      {
        h: "Lo que dicen los números",
        paragraphs: [
          "En nuestras tier lists actualizamos armas y personajes con criterios verificables: daño por segundo teórico, cargador, alcance y sinergia con habilidades.",
          "La MP40 mantiene el mejor cuerpo a cuerpo por su cadencia. La AWM sigue siendo la única garantía real de un disparo, una baja.",
        ],
        list: [
          "Combates en construcciones: MP40 o M1887 con Kelly o Jota.",
          "Rango medio: XM8 o M4A1 con Laura o Moco.",
          "Francotirador: AWM con Falco para drops agresivos.",
        ],
      },
      {
        h: "Por qué cambia cada parche",
        paragraphs: [
          "Garena ajusta daños, retrocesos y habilidades en cada actualización. Por eso todas nuestras páginas de datos incluyen fecha de verificación visible: nadie debe tratar el meta como una tabla fija.",
        ],
      },
    ],
  },
  {
    slug: "eventos-verano-calendario",
    title: "Eventos de la temporada: nuestro calendario",
    category: "Eventos",
    date: "8 de agosto de 2026",
    readMinutes: 3,
    lead: "Recopilamos los eventos activos y próximos con su estado de confirmación. Ninguno de ellos entrega diamantes reales: solo recompensas dentro del juego cuando son oficiales.",
    sections: [
      {
        h: "Cómo leemos los eventos",
        paragraphs: [
          "Cada evento se marca como Confirmado (anunciado en canales oficiales), Sin confirmar (rumor de comunidad) o Finalizado. No publicamos eventos inventados solo para llenar el calendario.",
        ],
        list: [
          "Los eventos 'sin confirmar' son especulación de la comunidad: tratarlos como rumor.",
          "La recompensa de cada evento se describe tal cual se anuncia; nunca la inflamos.",
          "Encontrá el detalle completo en la página de eventos, con fechas de verificación.",
        ],
      },
    ],
  },
  {
    slug: "como-verificamos-la-informacion",
    title: "Cómo verificamos cada dato del portal",
    category: "Metodología",
    date: "5 de agosto de 2026",
    readMinutes: 4,
    lead: "Códigos, eventos, precios y estadísticas cambian. Te explicamos el proceso que seguimos para no publicar humo.",
    sections: [
      {
        h: "La regla de las fuentes",
        paragraphs: [
          "Toda información que puede cambiar (códigos, eventos, requisitos, valores de armas) tiene fecha de verificación visible en la página. Si no podemos verificar algo, no lo publicamos o lo marcamos explícitamente como pendiente.",
          "Los simuladores del portal son solo entretenimiento: no generan diamantes, puntos ni recompensas reales, y así lo declaran en cada herramienta.",
        ],
      },
    ],
  },
];

export function getNews(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}