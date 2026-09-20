"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ToolPage } from "@/components/ToolPage";
import { DataTable } from "@/components/DataTable";
import { PACKETS, PACKETS_NOTE, PACKETS_VERIFIED, packetValue } from "@/content/packets";
import { fmt } from "@/lib/utils";

export default function ComparadorRecargasPage() {
  const [a, setA] = useState(PACKETS[1].id);
  const [b, setB] = useState(PACKETS[3].id);
  const selA = PACKETS.find((p) => p.id === a)!;
  const selB = PACKETS.find((p) => p.id === b)!;

  const va = useMemo(() => packetValue(selA), [selA]);
  const vb = useMemo(() => packetValue(selB), [selB]);

const delta = va.perUnit - vb.perUnit;
const better = delta === 0 ? null : delta > 0 ? selB : selA;
const per100 = Math.abs(delta) * 100;

const rows = PACKETS.map((p) => {
    const v = packetValue(p);
    return [
      <span key="n" className="font-bold text-bone">{p.name}</span>,
      <span key="d" className="tabular">{p.diamonds}</span>,
      <span key="b" className="tabular">{p.bonusPct}%</span>,
      <span key="t" className="tabular">{v.total}</span>,
      <span key="u" className="tabular">${v.perUnit.toFixed(4)}</span>,
    ];
  });

  return (
    <ToolPage
      path="/herramientas/diamantes/comparador-recargas"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Diamantes", href: "/herramientas" },
        { label: "Comparador de recargas", href: "/herramientas/diamantes/comparador-recargas" },
      ]}
      title="Comparador de paquetes de recarga"
      tag="DIAMANTES · COMPARATIVA"
      intro="Cada paquete incluye una bonificación porcentual: el precio por diamante real recibido baja en los paquetes grandes. Esta tabla lo calcula con números, no con colores."
      howTo={[
        "Mirá la columna 'precio por diamante': cuanto menor, mejor rendimiento.",
        "Elegí dos paquetes abajo para ver el duelo cara a cara.",
        "La bonificación porcentual se suma a los diamantes del paquete.",
        "Recordá: precios de referencia, no ofertas vigentes.",
      ]}
      related={[
        { href: "/herramientas/diamantes/calculadora", label: "Calculadora de diamantes", note: "tu moneda a diamantes" },
        { href: "/herramientas/diamantes/bonificacion", label: "Calculadora de bonificación", note: "cuánto rinde más la bonus" },
        { href: "/guias/comprar-diamantes-oficial", label: "Guía de compra oficial", note: "seguridad ante todo" },
      ]}
      softwareName="Comparador de paquetes de recarga de Free Fire"
    >
      <DataTable
        headers={["Paquete", "Diamantes", "Bonus", "Total recibido", "Precio / diamante"]}
        rows={rows}
        footnote={`${PACKETS_NOTE} · Verificado: ${PACKETS_VERIFIED}`}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border border-line bg-surface p-5">
          <label htmlFor="pkg-a" className="block text-xs uppercase tracking-widest text-faint">Paquete A</label>
          <select id="pkg-a" className="field mt-2" value={a} onChange={(e) => setA(e.target.value)}>
            {PACKETS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-faint">Diamantes con bonus</dt><dd className="tabular text-bone">{fmt(va.total)}</dd></div>
            <div className="flex justify-between"><dt className="text-faint">Precio por diamante</dt><dd className="tabular text-bone">${va.perUnit.toFixed(4)}</dd></div>
            <div className="flex justify-between"><dt className="text-faint">Costo</dt><dd className="tabular text-bone">${selA.usd.toFixed(2)}</dd></div>
          </dl>
        </div>
        <div className="border border-line bg-surface p-5">
          <label htmlFor="pkg-b" className="block text-xs uppercase tracking-widest text-faint">Paquete B</label>
          <select id="pkg-b" className="field mt-2" value={b} onChange={(e) => setB(e.target.value)}>
            {PACKETS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-faint">Diamantes con bonus</dt><dd className="tabular text-bone">{fmt(vb.total)}</dd></div>
            <div className="flex justify-between"><dt className="text-faint">Precio por diamante</dt><dd className="tabular text-bone">${vb.perUnit.toFixed(4)}</dd></div>
            <div className="flex justify-between"><dt className="text-faint">Costo</dt><dd className="tabular text-bone">${selB.usd.toFixed(2)}</dd></div>
          </dl>
        </div>
      </div>

      <div className="mt-6 border border-warn/60 bg-surface p-5">
        <p className="tabular text-xs uppercase tracking-widest text-warn">veredicto del duelo</p>
        <p className="mt-2 text-muted">
          {better ? (
            <>
              <span className="font-bold text-bone">{better.name}</span> entrega un precio por diamante{" "}
              <span className="text-radar">${(Math.min(va.perUnit, vb.perUnit)).toFixed(4)}</span> vs el menos
              eficiente a <span className="text-alert">${(Math.max(va.perUnit, vb.perUnit)).toFixed(4)}</span>:
              ahorrás ${per100.toFixed(2)} por cada 100 diamantes comparando bien.
            </>
          ) : (
            "Ambos paquetes cuestan lo mismo por diamante."
          )}
        </p>
        <p className="mt-2 text-xs text-faint">Siempre verificá en la tienda oficial antes de pagar: aquí mostramos promedios.</p>
      </div>

      <p className="mt-6 text-sm text-faint">
        ¿Tenés dudas sobre dónde comprar? <Link href="/guias/comprar-diamantes-oficial" className="inklink">Leé la guía de compra segura</Link>.
      </p>
    </ToolPage>
  );
}