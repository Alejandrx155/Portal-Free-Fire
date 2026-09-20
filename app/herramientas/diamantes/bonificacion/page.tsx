"use client";

import { useMemo, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CountUp } from "@/components/CountUp";
import { PACKETS, PACKETS_NOTE, PACKETS_VERIFIED } from "@/content/packets";
import { fmt } from "@/lib/utils";

export default function BonificacionPage() {
  const [id, setId] = useState(PACKETS[2].id);
  const [extra, setExtra] = useState("0");
  const p = PACKETS.find((x) => x.id === id)!;
  const e = Math.max(0, Math.min(200, parseFloat(extra) || 0));

  const base = p.diamonds * (1 + p.bonusPct / 100);
  const total = base * (1 + e / 100);
  const extraGems = total - base;

  const copy = `${p.name}: ${fmt(p.diamonds)} diamantes + ${p.bonusPct}% de bonus (${fmt(Math.round(base))}), más ${e}% extra (${fmt(Math.round(extraGems))}) = ${fmt(Math.round(total))} diamantes totales.`;

  const tableRows = PACKETS.map((x) => {
    const b = x.diamonds * (1 + x.bonusPct / 100);
    const t = b * (1 + e / 100);
    return [
      <span key="n" className="font-bold text-bone">{x.name}</span>,
      <span key="d" className="tabular">{x.diamonds}</span>,
      <span key="bp" className="tabular">{x.bonusPct}%</span>,
      <span key="b" className="tabular">{fmt(Math.round(b))}</span>,
      <span key="t" className="tabular">{fmt(Math.round(t))}</span>,
      <span key="e" className="tabular text-radar">{fmt(Math.round(t - b))}</span>,
    ];
  });

  const savings = useMemo(() => (e > 0 ? p.usd * (1 - 1 / (1 + e / 100)) : 0), [p, e]);

  return (
    <ToolPage
      path="/herramientas/diamantes/bonificacion"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Diamantes", href: "/herramientas" },
        { label: "Bonificación", href: "/herramientas/diamantes/bonificacion" },
      ]}
      title="Calculadora de bonificación por recarga"
      tag="DIAMANTES · CÁLCULO"
      intro="Sumá el bonus porcentual del paquete y cualquier promoción extra (eventos oficiales) para saber cuántos diamantes reales recibirías en total."
      howTo={[
        "Elegí el paquete base.",
        "Indicá el porcentaje extra de una promoción oficial (ej. 10% por evento).",
        "La tabla recalcula el total recibido y el extra ganado por paquete.",
        "Las promociones reales solo se anuncian dentro del juego: cualquier 'bonus' externo es estafa.",
      ]}
      related={[
        { href: "/herramientas/diamantes/comparador-recargas", label: "Comparador de recargas", note: "precio eficiente por diamante" },
        { href: "/guias/comprar-diamantes-oficial", label: "Guía de compra oficial", note: "las vías seguras" },
        { href: "/guias/estafas-diamantes-gratis", label: "Detectar estafas", note: "bonus falsos incluidos" },
      ]}
      softwareName="Calculadora de bonificación por recarga de Free Fire"
    >
      <div className="border border-line bg-surface p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pkg" className="block text-xs uppercase tracking-widest text-faint">Paquete</label>
            <select id="pkg" className="field mt-2" value={id} onChange={(e) => setId(e.target.value)}>
              {PACKETS.map((x) => (
                <option key={x.id} value={x.id}>{x.name} · {x.diamonds} diamantes</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="extra" className="block text-xs uppercase tracking-widest text-faint">Bonus extra promocional (%)</label>
            <input id="extra" type="number" min="0" max="200" className="field mt-2" value={extra} onChange={(e) => setExtra(e.target.value)} />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-line2 bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-faint">paquete + bonus base</p>
            <p className="font-display mt-1 text-3xl text-bone">{fmt(Math.round(base))}</p>
          </div>
          <div className="border border-line2 bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-radar">diamantes extra</p>
            <p className="font-display mt-1 text-3xl text-radar">+{fmt(Math.round(extraGems))}</p>
          </div>
          <div className="border border-warn bg-ink2 p-4">
            <p className="tabular text-xs uppercase tracking-widest text-warn">total estimado</p>
            <p className="font-display mt-1 text-3xl text-warn">
              <CountUp value={Math.round(total)} />
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <button
            type="button"
            className="btn btn-ghost text-[0.78rem]"
            onClick={() => navigator.clipboard?.writeText(copy).catch(() => undefined)}
          >
            Copiar resumen
          </button>
          <p className="text-xs text-faint">
            {e > 0
              ? `Promoción ${e}% equivale a descontar ~$${savings.toFixed(2)} sobre el costo de referencia.`
              : "Agregá un bonus extra para ver el efecto en la tabla."}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full border border-line text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-ink2">
              {["Paquete", "Diamantes", "Bonus base", "Con base", "Con extra", "Extra sumado"].map((h) => (
                <th key={h} className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i} className="border-b border-line/60 last:border-0 hover:bg-raised">
                {row.map((c, j) => <td key={j} className="px-3 py-2.5 text-muted">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="tabular mt-2 text-xs text-faint">{PACKETS_NOTE} · Verificado: {PACKETS_VERIFIED}</p>
      </div>
    </ToolPage>
  );
}