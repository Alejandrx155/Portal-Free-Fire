"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";
import { CountUp } from "@/components/CountUp";
import { PACKETS, PACKETS_NOTE, PACKETS_VERIFIED } from "@/content/packets";
import { fmt } from "@/lib/utils";

const CUR = [
  { id: "usd", label: "USD ($)", rate: 1 },
  { id: "ars", label: "ARS ($, aproximado)", rate: 1100 },
  { id: "mxn", label: "MXN ($)", rate: 18.5 },
  { id: "cop", label: "COP ($)", rate: 4100 },
];

export default function CalcDiamantesPage() {
  const [cur, setCur] = useState("usd");
  const [amount, setAmount] = useState("10");
  const [name, setName] = useState("Recarga estándar");

  const a = parseFloat(amount) || 0;
  const rate = CUR.find((c) => c.id === cur)!.rate;
  const usd = a / rate;
  const perUnit = PACKETS.reduce((acc, p) => acc + p.usd / (p.diamonds * (1 + p.bonusPct / 100)), 0) / PACKETS.length;
  const gems = perUnit > 0 ? Math.floor(usd / perUnit) : 0;

  const result = `${name}: ~${fmt(gems)} diamantes estimados por ${fmt(a)} ${cur.toUpperCase()} (tarifa promedio del mercado)`;

  return (
    <ToolPage
      path="/herramientas/diamantes/calculadora"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Diamantes", href: "/herramientas" },
        { label: "Calculadora", href: "/herramientas/diamantes/calculadora" },
      ]}
      title="Calculadora de diamantes"
      tag="DIAMANTES · ESTIMACIÓN"
      intro="Convertí tu moneda a una estimación de diamantes usando la tarifa promedio de los paquetes oficiales. Es una referencia orientativa: los precios y bonificaciones reales los fija la tienda del juego."
      howTo={[
        "Elegí tu moneda: la calculadora convierte a USD como referencia.",
        "Escribí cuánto pensás gastar (aparece también en USD).",
        "El resultado estima diamantes a la tarifa promedio verificada.",
        "Antes de comprar, compará paquetes en el comparador de recargas.",
      ]}
      related={[
        { href: "/herramientas/diamantes/comparador-recargas", label: "Comparador de recargas", note: "qué paquete rinde más" },
        { href: "/herramientas/diamantes/bonificacion", label: "Calculadora de bonificación", note: "bonus por recarga" },
        { href: "/guias/comprar-diamantes-oficial", label: "Comprar diamantes oficial", note: "cómo hacerlo con seguridad" },
        { href: "/guias/estafas-diamantes-gratis", label: "Detectar estafas", note: "lo que nunca hay que creer" },
      ]}
      softwareName="Calculadora de diamantes de Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="cur" className="block text-xs uppercase tracking-widest text-faint">Moneda</label>
            <select id="cur" className="field mt-2" value={cur} onChange={(e) => setCur(e.target.value)}>
              {CUR.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-xs uppercase tracking-widest text-faint">Cuánto vas a gastar</label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.5"
              className="field mt-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-faint">Nombre (opcional)</label>
            <input
              id="name"
              type="text"
              className="field mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 border border-line2 bg-ink2 p-5">
          <p className="tabular text-xs uppercase tracking-widest text-faint">resultado estimado</p>
          <p className="font-display mt-2 text-4xl text-warn md:text-5xl">
            ~<CountUp value={gems} />
            <span className="ml-2 text-2xl text-bone">diamantes</span>
          </p>
          <p className="tabular mt-2 text-sm text-muted">
            {usd > 0 ? `${fmt(a)} ${cur.toUpperCase()} ≈ ${usd.toFixed(2)} USD` : "ingresá un monto"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CopyButton value={result} label="Copiar resultado" />
          </div>
        </div>
        <p className="tabular mt-4 text-xs text-faint">
          tarifa promedio verificada: {fmt(Math.round(1 / perUnit))} diamantes por 1 USD · datos: {PACKETS_VERIFIED}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-faint">{PACKETS_NOTE}</p>
      </div>
    </ToolPage>
  );
}