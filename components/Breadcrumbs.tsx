import Link from "next/link";
import { absUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { TOOLS_GROUPS } from "@/lib/nav";

export type Crumb = { label: string; href: string };

function normalizeTrail(items: Crumb[]): Crumb[] {
  const trail: Crumb[] = [];
  const pageCrumb = [...items].reverse().find((c) => c.href !== "/herramientas" && c.href !== "/");
  const group = pageCrumb
    ? TOOLS_GROUPS.find((g) => g.href === pageCrumb.href || g.items.some((i) => i.href === pageCrumb.href))
    : undefined;
  const groupHref = group?.href;
  for (const c of [{ label: "Inicio", href: "/" }, ...items]) {
    let href = c.href;
    if (c.href === "/herramientas" && c.label !== "Herramientas" && groupHref) {
      href = groupHref;
    }
    const crumb = { label: c.label, href };
    const prev = trail[trail.length - 1];
    if (prev && prev.href === crumb.href) {
      trail[trail.length - 1] = crumb;
    } else {
      trail.push(crumb);
    }
  }
  return trail;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full = normalizeTrail(items);
  return (
    <nav aria-label="Miga de pan" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[0.78rem] uppercase tracking-wide text-faint">
        {full.map((c, i) => {
          const last = i === full.length - 1;
          return (
            <li key={`${c.href}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true" className="text-faint">/</span>}
              {last ? (
                <span className="text-muted" aria-current="page">{c.label}</span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-warn">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: full.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absUrl(c.href),
          })),
        }}
      />
    </nav>
  );
}