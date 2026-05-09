"use client";

import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Editorial ease — matches ScrollReveal / soft landing */
const easeOut = [0.22, 1, 0.36, 1] as const;

type Parsed = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
};

function parseStatString(s: string): Parsed {
  const t = s.trim();
  let prefix = "";
  let body = t;
  if (body.startsWith("+")) {
    prefix = "+";
    body = body.slice(1);
  }
  const km = body.match(/^([\d.,]+)\s*([kKmM])$/);
  if (km) {
    const rawNum = km[1].replace(",", ".");
    const target = parseFloat(rawNum);
    const decimals = rawNum.includes(".") ? rawNum.split(".")[1].length : 0;
    return {
      prefix,
      suffix: km[2].toUpperCase(),
      target: Number.isFinite(target) ? target : 0,
      decimals,
    };
  }
  const target =
    parseFloat(body.replace(/,/g, ".").replace(/\s/g, "")) || 0;
  return {
    prefix,
    suffix: "",
    target,
    decimals: 0,
  };
}

function formatProgress(n: number, p: Parsed): string {
  const clamped = Math.min(Math.max(0, n), p.target);
  if (p.suffix) {
    const core =
      p.decimals > 0
        ? clamped.toFixed(p.decimals)
        : String(Math.round(clamped));
    return `${p.prefix}${core}${p.suffix}`;
  }
  return `${p.prefix}${Math.round(clamped)}`;
}

export default function CountUpStat({
  value,
  className,
  index = 0,
}: {
  value: string;
  className?: string;
  index?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -10% 0px",
    amount: 0.35,
  });
  const reduceMotion = useReducedMotion();
  const parsed = parseStatString(value);
  const [display, setDisplay] = useState(() =>
    reduceMotion ? value.trim() : formatProgress(0, parsed),
  );

  useEffect(() => {
    const p = parseStatString(value);

    if (reduceMotion) {
      setDisplay(value.trim());
      return;
    }

    if (!isInView) {
      setDisplay(formatProgress(0, p));
      return;
    }

    setDisplay(formatProgress(0, p));
    const controls = animate(0, p.target, {
      duration: p.target >= 50 ? 1.35 : 1.05,
      delay: index * 0.07,
      ease: easeOut,
      onUpdate: (v) => setDisplay(formatProgress(v, p)),
      onComplete: () => setDisplay(value.trim()),
    });

    return () => controls.stop();
  }, [isInView, value, reduceMotion, index]);

  return (
    <p ref={ref} className={className} suppressHydrationWarning>
      {display}
    </p>
  );
}
