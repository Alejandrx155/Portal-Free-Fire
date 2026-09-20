export const VERIFIED = "17 de agosto de 2026";

export type Tier = "S" | "A" | "B" | "C";

export type Weapon = {
  slug: string;
  name: string;
  category: "Rifles de asalto" | "Subfusiles" | "Escopetas" | "Francotiradoras" | "Ametralladoras" | "Pistolas";
  dmg: number;
  rpm: number;
  mag: number;
  range: number;
  accuracy: number;
  pen: number;
  mobility: number;
  tier: Tier;
  desc: string;
};

export type Character = {
  slug: string;
  name: string;
  role: "Ofensivo" | "Defensivo" | "Soporte" | "Versátil";
  active: string;
  passive: string;
  desc: string;
  cost: number;
  unlock: string;
  tier: Tier;
};

export type Pet = {
  slug: string;
  name: string;
  skill: string;
  effect: string;
  cost: number;
  tier: Tier;
  desc: string;
};

export type Vehicle = {
  slug: string;
  name: string;
  type: "Tierra" | "Agua" | "Aire";
  seats: number;
  speed: number;
  resistance: number;
  rare: boolean;
  desc: string;
};

export type Packet = {
  id: string;
  name: string;
  diamonds: number;
  usd: number;
  bonusPct: number;
  note?: string;
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMinutes: number;
  lead: string;
  related: string[];
  sections: {
    h: string;
    paragraphs?: string[];
    list?: string[];
    ordered?: string[];
    note?: string;
  }[];
};

export type NewsItem = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMinutes: number;
  lead: string;
  sections: {
    h: string;
    paragraphs?: string[];
    list?: string[];
    ordered?: string[];
    note?: string;
  }[];
};

export type EventItem = {
  slug: string;
  title: string;
  type: string;
  status: "Confirmado" | "Sin confirmar" | "Finalizado";
  start: string;
  end?: string;
  desc: string;
};

export type Faq = { q: string; a: string };

export type Term = { term: string; def: string };

export type CodeEntry = {
  code: string;
  reward: string;
  status: "activo" | "ejemplo" | "vencido";
  verified: string;
  note: string;
};