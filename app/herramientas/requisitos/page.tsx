"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { DEVICE_REQS, REQ_NOTE, REQ_VERIFIED } from "@/content/requirements";

type Platform = keyof typeof DEVICE_REQS;
type Gama = "min" | "rec" | "high";

export default function RequisitosPage() {
  const [platform, setPlatform] = useState<Platform>("android");
  const [gama, setGama] = useState<Gama>("rec");

  const req = DEVICE_REQS[platform][gama];

  const verdict =
    gama === "min"
      ? { label: "Jugarás con límites", color: "text-warn border-warn" }
      : gama === "rec"
      ? { label: "Experiencia fluida", color: "text-radar border-radar" }
      : { label: "Alto rendimiento", color: "text-radar border-radar" };

  return (
    <ToolPage
      path="/herramientas/requisitos"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Calculadoras", href: "/herramientas" },
        { label: "Requisitos", href: "/herramientas/requisitos" },
      ]}
      title="Verificador de requisitos del dispositivo"
      tag="HARDWARE · CHECK"
      intro="Compará tu equipo contra los mínimos y recomendados aproximados para Free Fire (Android e iOS), y leé qué esperar en cada gama."
      howTo={[
        "Elegí tu plataforma.",
        "Marcá la gama que creés que tiene tu teléfono (RAM y chip).",
        "El veredicto te dice qué gráficos y FPS esperar.",
        "Si tu equipo queda en 'mínimos', la página de gráficos te ayuda a exprimirlo.",
      ]}
      related={[
        { href: "/herramientas/ajustes-graficos", label: "Ajustes de gráficos", note: "config por gama" },
        { href: "/herramientas/comparadores/ff-vs-max", label: "FF vs FF MAX", note: "qué versión instalar" },
        { href: "/herramientas/sensibilidad/gama", label: "Sensibilidad por gama", note: "acompaña estos ajustes" },
      ]}
      softwareName="Verificador de requisitos de dispositivo para Free Fire"
    >
      <div className="border border-line bg-surface p-5 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="req-plat" className="block text-xs uppercase tracking-widest text-faint">Plataforma</label>
            <select id="req-plat" className="field mt-2" value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
            </select>
          </div>
          <div>
            <label htmlFor="req-gama" className="block text-xs uppercase tracking-widest text-faint">Nivel de tu equipo</label>
            <select id="req-gama" className="field mt-2" value={gama} onChange={(e) => setGama(e.target.value as Gama)}>
              <option value="min">Mínimo</option>
              <option value="rec">Recomendado</option>
              <option value="high">Gama alta</option>
            </select>
          </div>
          <div>
            <p className="block text-xs uppercase tracking-widest text-faint">Veredicto</p>
            <p className={`mt-2 inline-block border px-3 py-1.5 text-sm font-bold ${verdict.color}`}>{verdict.label}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border border-line2 bg-ink2 p-4">
            <dt className="tabular text-xs uppercase tracking-widest text-faint">RAM mínima</dt>
            <dd className="mt-1 text-bone">{req.ram}</dd>
          </div>
          <div className="border border-line2 bg-ink2 p-4">
            <dt className="tabular text-xs uppercase tracking-widest text-faint">Chip de referencia</dt>
            <dd className="mt-1 text-bone">{req.soc}</dd>
          </div>
          <div className="border border-line2 bg-ink2 p-4 sm:col-span-2">
            <dt className="tabular text-xs uppercase tracking-widest text-faint">Qué esperar</dt>
            <dd className="mt-1 text-muted">{req.note}</dd>
          </div>
        </dl>
        <p className="mt-5 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">{REQ_NOTE} Verificado: {REQ_VERIFIED}.</p>
      </div>
    </ToolPage>
  );
}