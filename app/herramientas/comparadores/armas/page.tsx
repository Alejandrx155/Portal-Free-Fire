"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { TierBadge, RatingDots } from "@/components/DataTable";
import { WEAPONS } from "@/content/weapons";
import { VERIFIED } from "@/content/types";

const CATS = ["Todas", ...Array.from(new Set(WEAPONS.map((w) => w.category)))];

export default function ComparadorArmasPage() {
  const [cat, setCat] = useState("Todas");
  const [sort, setSort] = useState<"cat" | "dmg" | "rpm">("cat");

  const list = useMemo(() => {
    let l = WEAPONS.filter((w) => cat === "Todas" || w.category === cat);
    if (sort === "dmg") l = [...l].sort((a, b) => b.dmg - a.dmg);
    if (sort === "rpm") l = [...l].sort((a, b) => b.rpm - a.rpm);
    return l;
  }, [cat, sort]);

  return (
    <ToolPage
      path="/herramientas/comparadores/armas"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Comparadores", href: "/herramientas" },
        { label: "Armas", href: "/herramientas/comparadores/armas" },
      ]}
      title="Comparador de armas"
      tag="COMPARADOR · ARMAS"
      intro="Todas las armas en una tabla filtrable: daño, cadencia, cargador, alcance, precisión y penetración. Los números deciden, no las opiniones."
      howTo={[
        "Filtrá por categoría y ordená por daño o cadencia.",
        "Alcance y precisión son valoraciones 1-10 basadas en el comportamiento típico.",
        "Penetración va de 1 a 3 (armadura): importa en duelos con chaleco.",
        "Cada arma enlaza a su ficha para el detalle completo.",
      ]}
      related={[
        { href: "/herramientas/calculadoras/dano", label: "Calculadora de daño", note: "arma + personaje" },
        { href: "/herramientas/tier-lists", label: "Tier list del meta", note: "qué juega hoy la gente" },
        { href: "/armas", label: "Fichas de armas", note: "contexto por arma" },
      ]}
      softwareName="Comparador de armas de Free Fire"
    >
      <div className="border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center gap-4">
          <label className="block text-xs uppercase tracking-widest text-faint">
            Categoría
            <select className="field mt-1 w-auto" value={cat} onChange={(e) => setCat(e.target.value)}>
              {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-widest text-faint">
            Ordenar por
            <select className="field mt-1 w-auto" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="cat">Categoría</option>
              <option value="dmg">Daño</option>
              <option value="rpm">Cadencia</option>
            </select>
          </label>
          <span className="tabular ml-auto text-xs text-faint">{list.length} armas · verificado {VERIFIED}</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto border border-line">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-ink2">
              {["Arma", "Cat.", "Tier", "Daño", "Cadencia", "Cargador", "Alcance", "Precisión", "Pen."].map((h) => (
                <th key={h} className="tabular whitespace-nowrap px-3 py-2.5 text-xs uppercase tracking-widest text-alert">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((w) => (
              <tr key={w.slug} className="border-b border-line/60 last:border-0 transition-colors hover:bg-raised">
                <td className="px-3 py-2.5"><Link href={`/armas/${w.slug}`} className="inklink font-bold">{w.name}</Link></td>
                <td className="px-3 py-2.5 text-muted">{w.category}</td>
                <td className="px-3 py-2.5"><TierBadge tier={w.tier} /></td>
                <td className="tabular px-3 py-2.5 text-bone">{w.dmg}</td>
                <td className="tabular px-3 py-2.5 text-bone">{w.rpm}</td>
                <td className="tabular px-3 py-2.5 text-bone">{w.mag}</td>
                <td className="px-3 py-2.5"><RatingDots value={w.range} /></td>
                <td className="px-3 py-2.5"><RatingDots value={w.accuracy} /></td>
                <td className="px-3 py-2.5"><RatingDots value={w.pen} max={3} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-faint">Daño por bala y cadencia aproximadas: cada parche ajusta valores. Verificado: {VERIFIED}.</p>
    </ToolPage>
  );
}