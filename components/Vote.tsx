"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Vote({ slug }: { slug: string }) {
  const key = `radarff.vote.${slug}`;
  const [votes, setVotes] = useState<{ up: number; down: number }>({ up: 0, down: 0 });
  const [mine, setMine] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        setVotes(parsed.votes ?? { up: 0, down: 0 });
        setMine(parsed.mine ?? null);
      }
    } catch {
      /* almacenamiento no disponible */
    }
  }, [key]);

  function vote(choice: "up" | "down") {
    const nextMine = mine === choice ? null : choice;
    const next = { ...votes };
    if (mine === "up") next.up--;
    if (mine === "down") next.down--;
    if (nextMine === "up") next.up++;
    if (nextMine === "down") next.down++;
    setVotes(next);
    setMine(nextMine);
    try {
      localStorage.setItem(key, JSON.stringify({ votes: next, mine: nextMine }));
    } catch {
      /* almacenamiento no disponible */
    }
  }

  return (
    <div className="mt-8 border-t border-line pt-4">
      <p className="text-xs uppercase tracking-widest text-faint">¿Te sirvió esta información?</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={() => vote("up")}
          className={cn("btn btn-ghost text-[0.78rem]", mine === "up" && "border-radar text-radar")}
          aria-pressed={mine === "up"}
        >
          Útil ({votes.up})
        </button>
        <button
          onClick={() => vote("down")}
          className={cn("btn btn-ghost text-[0.78rem]", mine === "down" && "border-alert text-alert")}
          aria-pressed={mine === "down"}
        >
          No útil ({votes.down})
        </button>
        <span className="text-xs text-faint">
          Guardado local por ahora; con cuenta de usuario se sincronizará.
        </span>
      </div>
    </div>
  );
}