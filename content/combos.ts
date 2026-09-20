export type ComboEntry = {
  id: string;
  style: string;
  tag: string;
  chars: string[];
  why: string;
};

export const POPULAR_COMBOS: ComboEntry[] = [
  {
    id: "rush",
    style: "Rush / Entrada agresiva",
    tag: "OFENSIVO",
    chars: ["Kelly", "Hayato", "Jota", "Alok"],
    why: "Kelly suma velocidad permanente para entrar primero, Hayato penetra el chaleco cuando pierde HP, Jota castiga el cuerpo a cuerpo y el aura de Alok sostiene la recuperación mientras pelean.",
  },
  {
    id: "squad",
    style: "Aguante de escuadra",
    tag: "SOPORTE",
    chars: ["Alok", "K", "Chrono", "Moco"],
    why: "Alok regenera a todo el equipo, K convierte EP en HP, la burbuja de Chrono absorbe intercambios duros y Moco marca a los enemigos para que la escuadra remate con información.",
  },
  {
    id: "sniper",
    style: "Francotirador",
    tag: "PRECISIÓN",
    chars: ["Laura", "Hayato", "K", "Moco"],
    why: "Laura da precisión total con la mira, Hayato castiga el chaleco a distancia, K sostiene la EP y Moco revela posiciones de los rivales marcados.",
  },
  {
    id: "durability",
    style: "Aguante / Supervivencia",
    tag: "DEFENSIVO",
    chars: ["Chrono", "Antonio", "Alok", "K"],
    why: "Chrono bloquea daño con su campo, Antonio arranca con EP extra para el primer intercambio, y Alok + K mantienen el HP alto durante toda la partida.",
  },
  {
    id: "burst",
    style: "Ofensivo puro",
    tag: "DAÑO",
    chars: ["Kelly", "Hayato", "Jota", "Maxim"],
    why: "Velocidad, penetración y cuerpo a cuerpo combinados para no dar respiro; Maxim además permite curarse al instante entre peleas.",
  },
  {
    id: "zone",
    style: "Control de zona",
    tag: "VERSÁTIL",
    chars: ["Skyler", "Alok", "Chrono", "Moco"],
    why: "Skyler abre cobertura, Chrono toma el frente sin exponerse, Alok mantiene la recuperación y Moco le da información a la rotación.",
  },
  {
    id: "solo",
    style: "Solo / Duo",
    tag: "AUTOSUFICIENTE",
    chars: ["Alok", "Chrono", "K", "Hayato"],
    why: "El combo clásico de solitario: regeneración, escudo, conversión de EP y penetración: ninguna etapa de la partida queda descubierta.",
  },
  {
    id: "cargo",
    style: "Carga de cobertura",
    tag: "ESTRUCTURAS",
    chars: ["Skyler", "Chrono", "Moco", "K"],
    why: "Skyler rompe paredes enemigas y Chrono da cobertura inmediata; Moco y K sostienen la información y la energía del equipo.",
  },
];