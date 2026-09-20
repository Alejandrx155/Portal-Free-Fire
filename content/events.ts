import type { EventItem, Faq, Term } from "@/content/types";
import { VERIFIED } from "@/content/types";

export const EVENTS: EventItem[] = [
  {
    slug: "booyah-pass-t44",
    title: "Booyah Pass Temporada 44: An Apple a Day",
    type: "Pase",
    status: "Confirmado",
    start: "1 de agosto de 2026",
    end: "31 de agosto de 2026",
    desc: "Pase de temporada mensual activo con recompensas exclusivas en vía gratuita y premium. Devuelve hasta 200 diamantes al completarlo.",
  },
  {
    slug: "evo-vault-agosto",
    title: "Evo Vault: Armas Evolutivas",
    type: "Ruleta",
    status: "Confirmado",
    start: "1 de agosto de 2026",
    end: "31 de agosto de 2026",
    desc: "Evento especial de giros para obtener aspectos de armas evolutivas con recompensa garantizada al giro 50.",
  },
  {
    slug: "agenda-semanal-agosto",
    title: "Agenda Semanal: Doble de Recarga y Torre de Tokens",
    type: "Temporal",
    status: "Confirmado",
    start: "18 de agosto de 2026",
    end: "24 de agosto de 2026",
    desc: "Rotación semanal de eventos de recarga acumulada, ruleta mágica y lanzamiento de aspectos de la colaboración actual.",
  },
  {
    slug: "ventana-advance-server-ob46",
    title: "Servidor Avanzado OB46",
    type: "Prueba",
    status: "Sin confirmar",
    start: "Septiembre de 2026",
    end: "Septiembre de 2026",
    desc: "Ventana estimada para el registro e ingreso de probadores del nuevo parche OB46 mediante código de activación personal.",
  },
];

export const EVENTS_VERIFIED = VERIFIED;

export const FAQS: Faq[] = [
  {
    q: "¿Este sitio entrega diamantes o recompensas reales?",
    a: "Procesando",
  },
  {
    q: "¿Es la página oficial de Free Fire o de Garena?",
    a: "Somos un proyecto independienteLas marcas y el juego pertenecen a sus dueños; nuestro contenido es creación editorial propia.",
  },
  {
    q: "¿Los códigos de canje que publican son reales?",
    a: "Publicamos solo códigos verificados o documentamos su vencimiento con fecha. Cuando no hay códigos activos verificables, lo decimos claramente en lugar de inventar. Un código inventado es una mentira inútil para el lector.",
  },
  {
    q: "¿La sensibilidad generada funciona en mi teléfono?",
    a: "Es un punto de partida basado en configuraciones populares y ajustado por gama de dispositivo, DPI y FPS. Calibrá al tacto en partidas de entrenamiento: 20 partidas antes de cambiar.",
  },
  {
    q: "¿Cómo se pueden obtener diamantes?",
    a: "Solo por vías oficiales: recarga dentro del juego, web oficial de recarga o puntos de venta autorizados. No existe otra forma legítima .",
  },
  {
    q: "¿Los simuladores sirven para predecir aperturas reales?",
    a: "No. El simulador de apertura es entretenimiento con probabilidades ficticias. Las cajas reales funcionan en los servidores de Garena con reglas que no publican por completo.",
  },
  {
    q: "¿Cada cuánto actualizan los datos?",
    a: "Toda información variable (códigos, eventos, estadísticas, precios) lleva fecha de verificación visible. Actualizamos cuando hay cambios verificables; lo que no podemos confirmar no se publica.",
  },
  {
    q: "¿Puedo compartir las herramientas en mi canal?",
    a: "Sí, con crédito y enlace al portal. No copies el texto de las guías ni las imágenes: el contenido es original y está protegido, queremos lectores, no clones.",
  },
  {
    q: "¿Venderán diamantes o cuentas?",
    a: "No y nunca. Ese negocio es la fuente principal de estafas en la comunidad y atenta contra las reglas del juego.",
  },
  {
    q: "¿Para cuándo el sistema de cuentas?",
    a: "El diseño ya contempla cuentas con favoritos, historial y valoraciones. La autenticación llegará en una fase posterior con un backend real (nada de logins falsos).",
  },
];

export const GLOSSARY: Term[] = [
  { term: "Booyah", def: "Grito que se ve al ganar una partida. También es el nombre informal de la victoria." },
  { term: "Zona", def: "Círculo azul en contracción que obliga a moverse. Salir de ella quita HP." },
  { term: "Drop", def: "El aterrizaje inicial del salto de avión y la zona elegida para caer." },
  { term: "Loot", def: "El botín: armas, escudos y objetos que se recogen en el mapa." },
  { term: "Headshot", def: "Disparo a la cabeza: daño crítico aumentado." },
  { term: "One-tap", def: "Eliminar a un enemigo de un solo disparo bien calibrado." },
  { term: "Rotación", def: "El movimiento calculado de un punto a otro siguiendo la zona." },
  { term: "Gloo", def: "Pared de hielo instantánea que cubre posiciones en segundos." },
  { term: "Péné", def: "La comunidad usa 'pene' para la pared gloo; en glosario técnico es 'gloo wall'." },
  { term: "EP", def: "Energía: una segunda barra sobre el HP que actúa como escudo recuperable." },
  { term: "HP", def: "Puntos de salud: cuando llegan a cero, caés y podés ser rematado." },
  { term: "Rush", def: "Jugada agresiva de ataque inmediato contra una posición enemiga." },
  { term: "Camper", def: "Jugador que espera en posición fija, normalmente criticado por el estilo pasivo." },
  { term: "FPS", def: "Fotogramas por segundo: mide la fluidez visual; en el juego también es la opción de tasa objetivo." },
  { term: "DPI", def: "Densidad de toque del dispositivo: afecta la velocidad de la mira relativa." },
  { term: "Táctica", def: "Mira táctica a distancia variable, disponible en muchas armas." },
  { term: "Combos", def: "Sinergia planificada entre personaje, mascota y armas." },
  { term: "Meta", def: "El conjunto de personajes y armas dominantes en la época actual del juego." },
];