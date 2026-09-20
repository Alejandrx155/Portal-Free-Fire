import { ToolPage } from "@/components/ToolPage";
import { TierBadge } from "@/components/DataTable";
import { UpdatedStamp } from "@/components/UpdatedStamp";
import { WEAPON_TIERS, CHARACTER_TIERS, PET_TIERS, TIERS_VERIFIED, TIER_NOTE } from "@/content/tierlists";

function TierList({ title, entries }: { title: string; entries: { name: string; tier: string; why: string }[] }) {
  return (
    <section>
      <h2 className="font-display mb-4 text-2xl uppercase text-bone">{title}</h2>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-ink2">
              <th className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">Tier</th>
              <th className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">Item</th>
              <th className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">Por qué</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.name} className="border-b border-line/60 last:border-0 transition-colors hover:bg-raised">
                <td className="px-3 py-2.5"><TierBadge tier={e.tier} /></td>
                <td className="px-3 py-2.5 font-bold text-bone">{e.name}</td>
                <td className="px-3 py-2.5 text-muted">{e.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function TierListsPage() {
  return (
    <ToolPage
      path="/herramientas/tier-lists"
      crumbs={[
        { label: "Herramientas", href: "/herramientas" },
        { label: "Comparadores", href: "/herramientas" },
        { label: "Tier lists", href: "/herramientas/tier-lists" },
      ]}
      title="Tier lists del meta actual"
      tag="META · EDITORIAL"
      intro="Nuestra lectura del meta de armas, personajes y mascotas con criterios explicitados: daño teórico, utilidad de habilidad y uso de la comunidad. Foto del parche, no ley eterna."
      howTo={[
        "S = dominantes en su rol; A = sólidas en su contexto; B = funcionales; C = situacionales.",
        "El meta cambia con cada parche: la fecha de verificación está a la vista.",
        "Combiná tier lists con los comparadores para decidir con números.",
      ]}
      related={[
        { href: "/herramientas/comparadores/armas", label: "Comparador de armas", note: "los números detrás" },
        { href: "/herramientas/comparadores/personajes", label: "Comparador de personajes", note: "activa vs pasiva" },
        { href: "/noticias/que-es-el-meta-ahora", label: "Análisis del meta", note: "nuestra nota editorial" },
      ]}
      softwareName="Tier lists del meta de Free Fire"
    >
      <UpdatedStamp date={TIERS_VERIFIED} what="Verificado" />
      <div className="mt-6 space-y-10">
        <TierList title="Armas" entries={WEAPON_TIERS} />
        <TierList title="Personajes" entries={CHARACTER_TIERS} />
        <TierList title="Mascotas" entries={PET_TIERS} />
      </div>
      <p className="mt-5 border border-line bg-surface px-4 py-3.5 text-sm leading-relaxed text-muted">{TIER_NOTE}</p>
    </ToolPage>
  );
}