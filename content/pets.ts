import type { Pet } from "@/content/types";

export const PETS: Pet[] = [
  { slug: "falco", name: "Falco", skill: "Skyline Spurt", effect: "Velocidad de caída y de planeo aumentadas para la escuadra", cost: 0, tier: "S", desc: "La mascota del drop agresivo: llegás antes a la loot, salís antes de la zona." },
  { slug: "rockie", name: "Rockie", skill: "Stay Chill", effect: "Reduce el tiempo de la habilidad de tu personaje", cost: 0, tier: "S", desc: "Sinergia directa con personajes de habilidad activa como Alok o Chrono." },
  { slug: "mister", name: "Mister Waggor", skill: "Smooth Gloo", effect: "Genera paredes de hielo según el tempo de la partida", cost: 599, tier: "A", desc: "Escudo móvil para rotaciones improvisadas al final de la zona." },
  { slug: "detehata", name: "Detehata", skill: "Healing Support", effect: "Usa un objeto de curación extra por partida", cost: 599, tier: "A", desc: "Curación extra que se activa sola: ideal para jugadores que olvidan el medkit." },
  { slug: "panda", name: "Panda", skill: "Cheerful Happy", effect: "Recupera HP al usar objetos de curación", cost: 599, tier: "B", desc: "Refuerzo de supervivencia en partidas largas." },
  { slug: "beaston", name: "Beaston", skill: "Rage Sprint", effect: "Recupera HP y velocidad al derribar enemigos", cost: 599, tier: "B", desc: "Recompensa agresiva: cada baja te mantiene a flote." },
  { slug: "ogre", name: "Ogre", skill: "Formidable Defense", effect: "Reducción de daño al recibir impactos seguidos", cost: 599, tier: "B", desc: "Tanque para escuadras que pelean cerca." },
  { slug: "robo", name: "Robo", skill: "Specialized Sniper", effect: "Mejora la velocidad de cambio de arma tras disparos de precisión", cost: 499, tier: "C", desc: "Extra de comodidad para francotiradores que alternan armas." },
];

export const PET_COLS = [
  { key: "skill", label: "Habilidad" },
  { key: "effect", label: "Efecto" },
  { key: "cost", label: "Costo" },
] as const;