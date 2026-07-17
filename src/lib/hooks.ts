import { useEffect, useRef, useState } from "react";

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Simula um carregamento breve (para exibir skeletons na demo). */
export function useFakeLoading(ms = 650): boolean {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}

/** Anima um número de 0 até o alvo. Respeita prefers-reduced-motion. */
export function useCountUp(target: number, duration = 900): number {
  const [value, setValue] = useState(reduceMotion() ? target : 0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduceMotion()) {
      setValue(target);
      return;
    }
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else setValue(target);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}
