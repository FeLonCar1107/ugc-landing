"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Smooth deceleration — similar feel to typical Framer marketing pages */
const easeEditorial = [0.16, 1, 0.3, 1] as const;

const defaultViewport = {
  once: true,
  margin: "-56px 0px -12% 0px" as const,
  amount: 0.18 as const,
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.72,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration, delay, ease: easeEditorial }}
    >
      {children}
    </motion.div>
  );
}

function makeStaggerContainer(
  staggerChildren: number,
  delayChildren: number,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.64, ease: easeEditorial },
  },
};

type ScrollRevealStaggerProps = {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
};

export function ScrollRevealStagger({
  children,
  className,
  staggerChildren = 0.09,
  delayChildren = 0.05,
}: ScrollRevealStaggerProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={makeStaggerContainer(staggerChildren, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

type ScrollRevealStaggerUlProps = {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
};

export function ScrollRevealStaggerUl({
  children,
  className,
  staggerChildren = 0.11,
  delayChildren = 0.04,
}: ScrollRevealStaggerUlProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <ul className={className}>{children}</ul>;
  }
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={makeStaggerContainer(staggerChildren, delayChildren)}
    >
      {children}
    </motion.ul>
  );
}

export function ScrollRevealLi({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <li className={className}>{children}</li>;
  }
  return (
    <motion.li className={className} variants={staggerItem}>
      {children}
    </motion.li>
  );
}
