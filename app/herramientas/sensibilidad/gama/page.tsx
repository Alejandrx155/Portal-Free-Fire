import { SectionTitle } from "@/components/SectionTitle";
import { DataTable } from "@/components/DataTable";
import Link from "next/link";
import { meta } from "@/lib/meta";
import {
  SENS_PRESETS,
  SENS_ROWS,
  SENS_NOTE,
} from "@/content/sensitivity";

export const metadata = meta(
  "Sensibilidad por gama de teléfono",
  "Tablas de sensibilidad lista para usar por gama de dispositivo (baja, media y alta) y por presets headshot o one-tap.",
  "/herramientas/sensibilidad/gama"
);

export default function GamaPage() {
  const rows = SENS_ROWS.map((row) => [
    <span key="l" className="text-muted">{row.label}</span>,
    <span key="v" className="tabular font-bold text-warn">{SENS_PRESETS.headshot[row.key]}</span>,
    <span key="v2" className="tabular font-bold text-warn">{SENS_PRESETS["one-tap"][row.key]}</span>,
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <SectionTitle index="SNS-" title="Sensibilidad por gama de teléfono" sub="Presets listos para usar: headshot equilibrado y one-tap agresivo. La gama solo ajusta la escala general." />
      <DataTable
        headers={["Ajuste", "Headshot", "One-tap"]}
        rows={rows}
        footnote="No hay una gama 'correcta': gama baja compensa con valores un poco más altos por sentido común de fluidez. Probalo."
      />
      <p className="mt-4 text-sm text-faint">{SENS_NOTE}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/herramientas/sensibilidad/generador" className="btn btn-ghost">Generador con DPI y FPS</Link>
        <Link href="/herramientas/ajustes-graficos" className="btn btn-ghost">Gráficos por gama</Link>
      </div>
    </div>
  );
}