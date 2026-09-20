import { SectionTitle } from "@/components/SectionTitle";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { DataTable } from "@/components/DataTable";
import { meta } from "@/lib/meta";
import { EXPIRED_CODES, CODES_VERIFIED } from "@/content/codes";

export const metadata = meta(
  "Historial de códigos vencidos de Free Fire",
  "Registro educativo de códigos de Free Fire vencidos o de ejemplo: por qué no canjean y cómo reconocer el formato.",
  "/codigos/historial"
);

export default function HistorialPage() {
  const rows = EXPIRED_CODES.map((c) => [
    <span key="code" className="tabular font-bold line-through decoration-alert/70 text-faint">{c.code}</span>,
    <span key="rew" className="text-warn">{c.status === "ejemplo" ? "Formato educacional" : c.reward}</span>,
    <span key="ver" className="tabular text-muted">{c.verified}</span>,
  ]);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
      <SectionTitle index="HIST" title="Historial de códigos" sub="Registro con fines educativos: cómo se ve un código, por qué vence y cómo reconocer estafas." />
      <UpdatedStamp date={CODES_VERIFIED} what="Última verificación" />
      <div className="mt-6">
        <DataTable
          headers={["Código", "Estado", "Verificado"]}
          rows={rows}
          footnote="Ningún código de esta tabla es canjeable: son ejemplos educativos para que reconozcas el formato y no caigas en canjes falsos."
        />
      </div>
    </div>
  );
}