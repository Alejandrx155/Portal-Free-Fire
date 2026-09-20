import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";

export type RelatedLink = { href: string; label: string; note?: string };

export function RelatedLinks({ items, index = "REL" }: { items: RelatedLink[]; index?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <SectionTitle index={index} title="Sigue el rastro" sub="Lecturas y herramientas conectadas" />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="tile h-full">
              <span className="text-sm font-bold uppercase tracking-wide text-warn">{r.label}</span>
              {r.note && <span className="mt-1 block text-sm text-muted">{r.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}