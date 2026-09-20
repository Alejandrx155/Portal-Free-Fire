import type { Vehicle } from "@/content/types";

export const VEHICLES: Vehicle[] = [
  { slug: "coche", name: "Coche deportivo", type: "Tierra", seats: 2, speed: 4, resistance: 2, rare: false, desc: "Rápido en carretera, frágil fuera de ella." },
  { slug: "jeep", name: "Jeep", type: "Tierra", seats: 4, speed: 3, resistance: 4, rare: false, desc: "El todoterreno de la escuadra: lento pero aguanta." },
  { slug: "buggy", name: "Buggy", type: "Tierra", seats: 2, speed: 4, resistance: 1, rare: false, desc: "Cuadriciclo ágil para salir de zona apurado." },
  { slug: "camion", name: "Camión blindado", type: "Tierra", seats: 6, speed: 2, resistance: 5, rare: true, desc: "Muro con ruedas: ideal para travesías finales de zona." },
  { slug: "moto", name: "Motocicleta", type: "Tierra", seats: 2, speed: 5, resistance: 1, rare: false, desc: "La más veloz y la más peligrosa: un roce y volverte." },
  { slug: "barco", name: "Lancha", type: "Agua", seats: 4, speed: 3, resistance: 3, rare: false, desc: "Única opción para cruzar agua sin nadar a cámara lenta." },
  { slug: "puma", name: "Puma acorazado", type: "Tierra", seats: 4, speed: 3, resistance: 5, rare: true, desc: "Caballería pesada de mapas grandes." },
];

export const VEHICLE_COLS = [
  { key: "type", label: "Tipo" },
  { key: "seats", label: "Asientos" },
  { key: "speed", label: "Velocidad" },
  { key: "resistance", label: "Resistencia" },
] as const;