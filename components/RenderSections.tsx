export type Section = {
  h: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: string[];
  note?: string;
};

export function RenderSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s, i) => (
        <section key={i}>
          <h2 className="font-display text-2xl uppercase tracking-wide text-bone">{s.h}</h2>
          {s.paragraphs?.map((p, j) => (
            <p key={j} className="mt-4 leading-relaxed text-muted">
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="mt-4 space-y-2">
              {s.list.map((item, j) => (
                <li key={j} className="flex gap-3 text-muted">
                  <span className="tabular mt-1 text-alert">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {s.ordered && (
            <ol className="mt-4 space-y-2">
              {s.ordered.map((item, j) => (
                <li key={j} className="flex gap-3 text-muted">
                  <span className="tabular text-alert">{String(j + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}
          {s.note && (
            <p className="sim-note mt-4 p-3 text-sm">{s.note}</p>
          )}
        </section>
      ))}
    </div>
  );
}