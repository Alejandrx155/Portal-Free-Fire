import type { Character } from "@/content/types";

export const CHARACTERS: Character[] = [
  {
    slug: "alok",
    name: "Alok",
    role: "Soporte",
    active: "Ritmo Brutal (Activa): Crea un aura de 5m que aumenta la velocidad de movimiento un 15% y restaura 3 HP/seg por 10s (Enfriamiento: 45s).",
    passive: "Despertar (Remix de Alok): Lanza notas musicales que otorgan los mismos efectos a aliados cercanos.",
    desc: "Un clásico indispensable del meta para sostener a la escuadra en enfrentamientos prolongados y rotaciones.",
    cost: 10000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "S"
  },
  {
    slug: "k",
    name: "K",
    role: "Soporte",
    active: "Profesor de Todo (Activa): EP máx. aumenta en 50. Modo Jiu-Jitsu: aliados a 6m convierten EP a HP un 500% más rápido. Modo Psicología: recupera 3 EP c/2s hasta 250 EP (Enfriamiento: 6s).",
    passive: "Mecánica pasiva de conversión de EP a HP integrada en sus modos de juego.",
    desc: "Sinergia brutal con personajes como Miguel o Justin Bieber; brinda curación casi infinita en peleas prolongadas.",
    cost: 10000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "S"
  },
  {
    slug: "chrono",
    name: "Chrono",
    role: "Defensivo",
    active: "Sintonía Astral (Activa): Crea un campo de fuerza que bloquea 800 de daño. Los jugadores dentro no pueden disparar afuera por 6s (Enfriamiento: 75s).",
    passive: "Efecto de área bloqueadora de proyectiles durante la activación del campo.",
    desc: "El salvavidas por excelencia para rescatar aliados caídos en campo abierto o frenar rushes agresivos.",
    cost: 10000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "A"
  },
  {
    slug: "kelly",
    name: "Kelly",
    role: "Ofensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Carrera: Velocidad de sprint +6%. Despertar (Velocidad Mortal): Al correr 4s, el primer disparo inflige 106% de daño.",
    desc: "Infaltable en la mayoría de combos por su movilidad constante y el impulso de daño al abrir fuego.",
    cost: 2000,
    unlock: "Tienda con Oro / Eventos de inicio",
    tier: "S"
  },
  {
    slug: "hayato",
    name: "Hayato",
    role: "Ofensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Bushido: Por cada 10% de HP perdido, la penetración de armadura aumenta un 10%. Despertar: Reduce el daño frontal recibido.",
    desc: "Dominante en duelos a corta y media distancia. Castiga severamente a enemigos con chalecos de alto nivel.",
    cost: 10000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "S"
  },
  {
    slug: "moco",
    name: "Moco",
    role: "Soporte",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Ojo de Hacker: Marca a los enemigos disparados por 5s. Despertar (Rastreadora): La marca dura hasta 6.5s adicionales si el enemigo se mueve.",
    desc: "Proporciona visión táctica crucial a todo el equipo para coordinar rusheos y rematar enemigos tras coberturas.",
    cost: 8000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "A"
  },
  {
    slug: "dasha",
    name: "Dasha",
    role: "Ofensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Fiesta Salvaje: Tras derribar a un enemigo, entra en modo fiesta: +18% Vel. de disparo y +12% Vel. de movimiento por 6s.",
    desc: "Ideal para jugadores agresivos de SMG y AR que buscan encadenar múltiples bajas seguidas en rusheos.",
    cost: 10000,
    unlock: "Tienda with Oro / Diamantes",
    tier: "A"
  },
  {
    slug: "maxim",
    name: "Maxim",
    role: "Ofensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Glotonería: Reduce el tiempo para comer hongos y usar botiquines un 25%.",
    desc: "Otorga una velocidad de curación altísima para reincorporarse de inmediato a la batalla tras recibir daño.",
    cost: 2000,
    unlock: "Tienda con Oro / Recompensa inicial",
    tier: "B"
  },
  {
    slug: "antonio",
    name: "Antonio",
    role: "Defensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Espíritu de Ganster: Consigue 40 puntos de Escudo extra al comenzar la partida. Se regenera tras sobrevivir a un combate.",
    desc: "Excelente amortiguador de daño inicial en duelos tempranos de Duelo de Escuadras y Battle Royale.",
    cost: 2000,
    unlock: "Tienda con Oro / Eventos de registro",
    tier: "B"
  },
  {
    slug: "laura",
    name: "Laura",
    role: "Ofensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Tiradora Audaz: La precisión de las armas aumenta un 50% al usar la mira telescópica.",
    desc: "Convertidora de precisión letal para usuarios de rifles de asalto a larga distancia y tiradores de precisión.",
    cost: 8000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "A"
  },
  {
    slug: "jota",
    name: "Jota",
    role: "Ofensivo",
    active: "No posee habilidad activa (Personaje con Habilidad Pasiva).",
    passive: "Cacería Sostenida: Impactar a un enemigo con armas recupera HP; derribar a un enemigo restaura un 20% de HP máximo.",
    desc: "Sustento directo en combate continuo sin necesidad de detenerse a usar botiquines durante el intercambio de disparos.",
    cost: 10000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "A"
  },
  {
    slug: "skyler",
    name: "Skyler",
    role: "Versátil",
    active: "Ritmo Demoledor (Activa): Lanza una onda sónica hacia adelante que destruye hasta 5 Paredes Gloo en un radio de 100m (Enfriamiento: 45s).",
    passive: "Recuperación de HP integrada por cada Pared Gloo desplegada.",
    desc: "Especialista en contrarrestar coberturas enemigas y abrir ventanas de ataque directas contra la escuadra rival.",
    cost: 10000,
    unlock: "Tienda con Oro / Diamantes",
    tier: "A"
  }
];

export const CHARACTER_COLS = [
  { key: "active", label: "Habilidad activa" },
  { key: "passive", label: "Habilidad pasiva" },
  { key: "cost", label: "Costo (diamantes)" },
] as const;