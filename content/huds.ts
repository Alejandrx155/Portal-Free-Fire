export type HudButton = {
  id: string;
  label: string;
  left: number;
  top: number;
  size: number;
};

export type HudLayout = {
  id: string;
  name: string;
  fingers: number;
  desc: string;
  buttons: HudButton[];
};

export const HUD_LAYOUTS: HudLayout[] = [
  {
    id: "2-dedos",
    name: "2 dedos",
    fingers: 2,
    desc: "El layout clásico: solo pulgares. Todo el disparo a la derecha y el joystick a la izquierda. Ideal para empezar o jugar casual.",
    buttons: [
      { id: "joystick", label: "Joystick", left: 18, top: 66, size: 14 },
      { id: "fire", label: "Disparar", left: 84, top: 62, size: 12 },
      { id: "scope", label: "Mira", left: 88, top: 50, size: 9 },
      { id: "jump", label: "Saltar", left: 72, top: 12, size: 9 },
      { id: "crouch", label: "Agacharse", left: 60, top: 18, size: 9 },
      { id: "prone", label: "Tumbarse", left: 90, top: 10, size: 9 },
      { id: "gloo", label: "Pared", left: 76, top: 40, size: 8 },
      { id: "reload", label: "Recargar", left: 56, top: 46, size: 8 },
      { id: "loot", label: "Botín", left: 62, top: 30, size: 8 },
    ],
  },
  {
    id: "3-dedos",
    name: "3 dedos",
    fingers: 3,
    desc: "Agregás el índice izquierdo para disparar sin soltar el joystick: el primer paso del claw. Disparo secundario arriba a la izquierda.",
    buttons: [
      { id: "joystick", label: "Joystick", left: 18, top: 66, size: 14 },
      { id: "fire2", label: "Disparo II", left: 8, top: 42, size: 11 },
      { id: "fire", label: "Disparar", left: 84, top: 62, size: 12 },
      { id: "scope", label: "Mira", left: 88, top: 50, size: 9 },
      { id: "jump", label: "Saltar", left: 72, top: 12, size: 9 },
      { id: "crouch", label: "Agacharse", left: 60, top: 20, size: 9 },
      { id: "prone", label: "Tumbarse", left: 88, top: 10, size: 9 },
      { id: "gloo", label: "Pared", left: 76, top: 40, size: 8 },
      { id: "reload", label: "Recargar", left: 56, top: 46, size: 8 },
      { id: "loot", label: "Botín", left: 62, top: 30, size: 8 },
    ],
  },
  {
    id: "4-dedos",
    name: "4 dedos",
    fingers: 4,
    desc: "El estándar competitivo: cuatro dedos en pantalla. Disparo y mira arriba, joystick abajo, y acciones secundarias cerca del pulgar derecho.",
    buttons: [
      { id: "joystick", label: "Joystick", left: 18, top: 66, size: 14 },
      { id: "fire2", label: "Disparo II", left: 8, top: 38, size: 11 },
      { id: "fire", label: "Disparar", left: 86, top: 64, size: 12 },
      { id: "scope", label: "Mira", left: 90, top: 46, size: 9 },
      { id: "jump", label: "Saltar", left: 72, top: 10, size: 9 },
      { id: "crouch", label: "Agacharse", left: 58, top: 14, size: 9 },
      { id: "prone", label: "Tumbarse", left: 90, top: 8, size: 9 },
      { id: "gloo", label: "Pared", left: 78, top: 40, size: 8 },
      { id: "reload", label: "Recargar", left: 54, top: 40, size: 8 },
      { id: "loot", label: "Botín", left: 62, top: 30, size: 8 },
    ],
  },
  {
    id: "5-dedos",
    name: "5 dedos claw",
    fingers: 5,
    desc: "Layout competitivo de 5 dedos: el índice derecho suma salto/agacharse mientras los pulgares manejan movimiento y disparo. Acciones cubiertas en todo momento.",
    buttons: [
      { id: "joystick", label: "Joystick", left: 18, top: 66, size: 14 },
      { id: "fire2", label: "Disparo II", left: 6, top: 40, size: 11 },
      { id: "jump", label: "Saltar", left: 14, top: 24, size: 8 },
      { id: "crouch", label: "Agacharse", left: 22, top: 34, size: 8 },
      { id: "fire", label: "Disparar", left: 86, top: 64, size: 12 },
      { id: "scope", label: "Mira", left: 90, top: 46, size: 9 },
      { id: "prone", label: "Tumbarse", left: 88, top: 8, size: 9 },
      { id: "gloo", label: "Pared", left: 76, top: 34, size: 8 },
      { id: "reload", label: "Recargar", left: 56, top: 38, size: 8 },
      { id: "loot", label: "Botín", left: 62, top: 30, size: 8 },
    ],
  },
  {
    id: "emulador",
    name: "Emulador",
    fingers: 5,
    desc: "Configuración para jugar con teclado y mouse en emulador: apuntado con el mouse (mira en el centro) y acciones en teclas cercanas. Ajustá el tamaño según tu pantalla.",
    buttons: [
      { id: "move", label: "Movimiento (WASD)", left: 16, top: 70, size: 16 },
      { id: "mouse", label: "Apuntar (mouse)", left: 50, top: 40, size: 4 },
      { id: "fire", label: "Disparar (RMB)", left: 86, top: 62, size: 12 },
      { id: "scope", label: "Mira (RMB)", left: 88, top: 50, size: 9 },
      { id: "jump", label: "Saltar (Espacio)", left: 60, top: 78, size: 9 },
      { id: "crouch", label: "Agacharse (C)", left: 50, top: 82, size: 9 },
      { id: "prone", label: "Tumbarse (Z)", left: 90, top: 8, size: 9 },
      { id: "gloo", label: "Pared (Q)", left: 72, top: 70, size: 8 },
      { id: "reload", label: "Recargar (R)", left: 78, top: 34, size: 8 },
      { id: "loot", label: "Botín (Tab)", left: 40, top: 60, size: 8 },
    ],
  },
  {
    id: "6-dedos",
    name: "6 dedos claw",
    fingers: 6,
    desc: "Layout avanzado para 6 dedos: acciones en las cuatro esquinas y máximo control simultáneo. Para jugadores con mucha experiencia.",
    buttons: [
      { id: "joystick", label: "Joystick", left: 18, top: 66, size: 14 },
      { id: "fire2", label: "Disparo II", left: 6, top: 36, size: 11 },
      { id: "jump", label: "Saltar", left: 14, top: 20, size: 8 },
      { id: "loot", label: "Botín", left: 8, top: 24, size: 7 },
      { id: "gloo", label: "Pared", left: 78, top: 26, size: 8 },
      { id: "scope", label: "Mira", left: 88, top: 34, size: 9 },
      { id: "fire", label: "Disparar", left: 86, top: 64, size: 12 },
      { id: "crouch", label: "Agacharse", left: 60, top: 14, size: 9 },
      { id: "prone", label: "Tumbarse", left: 90, top: 8, size: 9 },
      { id: "reload", label: "Recargar", left: 54, top: 38, size: 8 },
    ],
  },
];

export function layoutToText(l: HudLayout): string {
  return [
    `HUD ${l.name} (${l.fingers} dedos)`,
    ...l.buttons.map((b) => `${b.label}: ${b.left}% x ${b.top}% · tamaño ${b.size}%`),
  ].join("\n");
}