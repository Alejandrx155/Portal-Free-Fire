import type { ReactNode } from "react";
import Link from "next/link";

export function DataTable({
  headers,
  rows,
  href,
  footnote,
}: {
  headers: string[];
  rows: ReactNode[][];
  href?: string[];
  footnote?: string;
}) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-ink2">
            {headers.map((h) => (
              <th key={h} scope="col" className="tabular px-3 py-2.5 text-xs uppercase tracking-widest text-alert">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line/60 transition-colors last:border-0 hover:bg-raised">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2.5 align-top text-muted">
                  {href && j === 0 ? (
                    <Link href={href[i]} className="inklink">
                      {cell}
                    </Link>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && <p className="border-t border-line px-3 py-2 text-xs text-faint">{footnote}</p>}
    </div>
  );
}

export function TierBadge({ tier, label }: { tier: string; label?: string }) {
  const color =
    tier === "S" ? "text-warn border-warn" : tier === "A" ? "text-radar border-radar" : tier === "B" ? "text-chill border-chill" : "text-faint border-line2";
  return (
    <span className={`inline-block border px-1.5 py-0.5 font-mono text-xs font-bold ${color}`}>
      {label ?? tier}
    </span>
  );
}

export function RatingDots({ value, max = 10 }: { value: number; max?: number }) {
  return (
    <span className="tabular text-xs tracking-tight" aria-label={`${value} de ${max}`}>
      {"■".repeat(Math.min(value, max))}
      <span className="text-faint">{"□".repeat(max - Math.min(value, max))}</span>
    </span>
  );
}