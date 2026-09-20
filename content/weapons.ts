import type { Weapon } from "@/content/types";

export const WEAPONS: Weapon[] = [
  { slug: "m1887", name: "M1887", category: "Escopetas", dmg: 115, rpm: 40, mag: 2, range: 3, accuracy: 5, pen: 1, mobility: 5, tier: "S", desc: "Escopeta de doble cañón: brutal en corta distancia, castiga el fallo." },
  { slug: "xm8", name: "XM8", category: "Rifles de asalto", dmg: 31, rpm: 100, mag: 28, range: 7, accuracy: 7, pen: 2, mobility: 7, tier: "S", desc: "Rifle equilibrado, una referencia para rotaciones agresivas." },
  { slug: "groza", name: "Groza", category: "Rifles de asalto", dmg: 33, rpm: 105, mag: 30, range: 7, accuracy: 7, pen: 2, mobility: 6, tier: "A", desc: "Daño alto y control exigente; premia al jugador que domina el retroceso." },
  { slug: "ak", name: "AK", category: "Rifles de asalto", dmg: 38, rpm: 95, mag: 30, range: 7, accuracy: 5, pen: 3, mobility: 6, tier: "A", desc: "Potente y penetrante, con retroceso alto: ideal para combos de habilidad." },
  { slug: "m4a1", name: "M4A1", category: "Rifles de asalto", dmg: 27, rpm: 115, mag: 32, range: 7, accuracy: 8, pen: 1, mobility: 7, tier: "A", desc: "Control y cadencia: la opción segura cuando falla la mira." },
  { slug: "scar", name: "SCAR", category: "Rifles de asalto", dmg: 29, rpm: 110, mag: 32, range: 7, accuracy: 7, pen: 1, mobility: 7, tier: "B", desc: "Versátil de todos los rangos, sin brillar en ninguno." },
  { slug: "mp40", name: "MP40", category: "Subfusiles", dmg: 24, rpm: 130, mag: 25, range: 4, accuracy: 5, pen: 1, mobility: 9, tier: "S", desc: "Cadencia y movilidad: el rey del cuerpo a cuerpo móvil." },
  { slug: "pp19", name: "PP19 Bizon", category: "Subfusiles", dmg: 21, rpm: 95, mag: 45, range: 5, accuracy: 6, pen: 1, mobility: 8, tier: "B", desc: "Cargador gigante para sostener fuego sin recargar." },
  { slug: "vector", name: "Vector", category: "Subfusiles", dmg: 23, rpm: 140, mag: 22, range: 4, accuracy: 6, pen: 1, mobility: 9, tier: "A", desc: "Dispareo fulminante; la recoja se come el cargador." },
  { slug: "uzi", name: "Uzi", category: "Subfusiles", dmg: 21, rpm: 150, mag: 24, range: 3, accuracy: 5, pen: 1, mobility: 9, tier: "A", desc: "Ráfaga corta y letal a muy corta distancia." },
  { slug: "m1014", name: "M1014", category: "Escopetas", dmg: 95, rpm: 85, mag: 6, range: 4, accuracy: 4, pen: 1, mobility: 6, tier: "A", desc: "Semiautomática: perdona el fallo más que la M1887." },
  { slug: "s12k", name: "S12K", category: "Escopetas", dmg: 90, rpm: 75, mag: 8, range: 4, accuracy: 4, pen: 1, mobility: 6, tier: "B", desc: "Cargador amplio para asaltos en construcciones." },
  { slug: "aWM", name: "AWM", category: "Francotiradoras", dmg: 100, rpm: 20, mag: 5, range: 10, accuracy: 9, pen: 3, mobility: 3, tier: "S", desc: "Un disparo, una eliminación: la referencia de francotiradoras." },
  { slug: "kar98k", name: "Kar98k", category: "Francotiradoras", dmg: 96, rpm: 22, mag: 5, range: 10, accuracy: 8, pen: 3, mobility: 4, tier: "A", desc: "Casi tan letal como la AWM, más ágil de alzar." },
  { slug: "m24", name: "M24", category: "Francotiradoras", dmg: 92, rpm: 24, mag: 5, range: 10, accuracy: 8, pen: 2, mobility: 4, tier: "B", desc: "Sólida para rango medio-largo, sin el golpe de la AWM." },
  { slug: "m249", name: "M249", category: "Ametralladoras", dmg: 30, rpm: 90, mag: 80, range: 8, accuracy: 5, pen: 2, mobility: 3, tier: "B", desc: "Soporte de fuego: sostenés una línea entera." },
  { slug: "m60", name: "M60", category: "Ametralladoras", dmg: 32, rpm: 85, mag: 60, range: 8, accuracy: 5, pen: 2, mobility: 3, tier: "C", desc: "Similar a la M249 con menos munición disponible." },
  { slug: "usp", name: "USP", category: "Pistolas", dmg: 34, rpm: 38, mag: 12, range: 3, accuracy: 6, pen: 1, mobility: 9, tier: "B", desc: "La pistola de arranque: mejor en reserva que en duelo." },
  { slug: "glock", name: "G18", category: "Pistolas", dmg: 23, rpm: 110, mag: 15, range: 3, accuracy: 4, pen: 1, mobility: 9, tier: "B", desc: "Ráfaga de emergencia cuando la primaria se queda sin balas." },
  { slug: "desert", name: "Desert Eagle", category: "Pistolas", dmg: 60, rpm: 25, mag: 7, range: 5, accuracy: 7, pen: 2, mobility: 8, tier: "A", desc: "Daño de fusil en el bolsillo: letal con mira a distancia." },
];

export const WEAPON_COLS = [
  { key: "dmg", label: "Daño" },
  { key: "rpm", label: "Cadencia" },
  { key: "mag", label: "Cargador" },
  { key: "range", label: "Alcance" },
  { key: "accuracy", label: "Precisión" },
  { key: "pen", label: "Penetración" },
  { key: "mobility", label: "Movilidad" },
] as const;