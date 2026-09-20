"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const show = useCallback((text: string) => {
    setMsg(text);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 1800);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const host = msg ? (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <span className="rounded-2xl border border-white/10 bg-ink2/90 px-4 py-2.5 text-sm font-semibold text-bone shadow-lg backdrop-blur-xl">
        {msg}
      </span>
    </div>
  ) : null;

  return { show, host };
}