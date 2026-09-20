"use client";

import { useMemo, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { WEAPONS } from "@/content/weapons";
import { CHARACTERS } from "@/content/characters";
import { VERIFIED } from "@/content/types";

const HP_TARGET = 200;

export default function CalculadoraDanoPage() {
  const [wSlug, setWSlug] = useState("xm8");
  const [cSlug, setCSlug] = useState("alok");

  const weapon = WEAPONS.find((w) => w.slug === wSlug)!;
  const char = CHARACTERS.find((c) => c.slug === cSlug);

  const stats = useMemo(() => {
    const dmgBase = weapon.dmg;
    const dmgHead = Math.round(dmgBase * 2);
    const dmgKelly = Math.round(dmgBase * 1.15);
    const shots = Math.ceil(HP_TARGET / dmgBase);
    const shotsHead = Math.ceil(HP_TARGET / dmgHead);
    const ttk = Math.round((shots / weapon.rpm) * 60000);
    const dps = Math.round((dmgBase * weapon.rpm) / 60);
    const head = char?.role === "Ofensivo" || char?.role === "Soporte";
    return { dmgBase, dmgHead, dmgKelly, shots, shotsHead, ttk, dps, head };
  }, [weapon, char]);

  return (
    <ToolPage
      path="/herramientas/calculadoras/dano"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Calculadoras", href: "/herramientas" },
        { label: "Daño", href: "/herramientas/calculadoras/dano" },
      ]}
      title="Calculadora de daño arma + personaje"
      tag="CALCULADORA · DMG"
      intro="Daño por bala, por tiro a la cabeza, disparos necesarios y tiempo para vaciar un objetivo de 200 HP con tu combinación. Simplificación honesta: el juego aplica blindaje, distancia y otras variables."
      howTo={[
        "Elegí el arma y el personaje.",
        "Mirá disparos necesarios y TTK: entre más bajo, mejor duelo.",
        "El ejemplo de Kelly muestra cómo una habilidad ofensiva cambia las cuentas.",
        "No compara blindaje ni distancia: para eso, práctica.",
      ]}
      related={[
        { href: "/herramientas/comparadores/armas", label: "Comparador de armas", note: "tabla completa" },
        { href: "/herramientas/generadores/combinaciones", label: "Generador de combinaciones", note: "ideas nuevas" },
        { href: "/herramientas/tier-lists", label: "Tier list del meta", note: "contexto del parche" },
      ]}
      softwareName="Calculadora de daño de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dmg-w" className="block text-xs uppercase tracking-widest text-faint">Arma</label>
            <select id="dmg-w" className="field mt-2" value={wSlug} onChange={(e) => setWSlug(e.target.value)}>
              {WEAPONS.map((w) => <option key={w.slug} value={w.slug}>{w.name} · {w.category}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="dmg-c" className="block text-xs uppercase tracking-widest text-faint">Personaje (para ver sinergia)</label>
            <select id="dmg-c" className="field mt-2" value={cSlug} onChange={(e) => setCSlug(e.target.value)}>
              {CHARACTERS.map((c) => <option key={c.slug} value={c.slug}>{c.name} · {c.role}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="border border-line2 bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-faint">daño por bala</p>
            <p className="font-display mt-1 text-3xl text-bone">{stats.dmgBase}</p>
          </div>
          <div className="border border-line2 bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-radar">daño a la cabeza</p>
            <p className="font-display mt-1 text-3xl text-radar">{stats.dmgHead}</p>
          </div>
          <div className="border border-line2 bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-faint">disparos a 200 HP</p>
            <p className="font-display mt-1 text-3xl text-bone">{stats.shots} <span className="text-base text-muted">({stats.shotsHead} a la cabeza)</span></p>
          </div>
          <div className="border border-line2 bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-warn">TTK (tiempo)</p>
            <p className="font-display mt-1 text-3xl text-warn">{stats.ttk} ms</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted">
          DPS teórico: <span className="tabular font-bold text-bone">{stats.dps}</span>. Con {char?.name} ({char?.role.toLowerCase()}),
          {stats.head
            ? " el rol ofensivo/soporte encaja con combos de presión: Kelly sumaría ~15% de daño en carrera (simulado aparte, no sumado aquí)."
            : " el rol no añade daño directo: la sinergia es de control o información."} El ejemplo Kelly existe para que veas que cambios simples mueven las cuentas.
        </p>
        <p className="tabular mt-4 text-xs text-faint">cifras base verificadas: {VERIFIED} · simplificación sin blindaje ni distancia.</p>
      </div>
    </ToolPage>
  );
}