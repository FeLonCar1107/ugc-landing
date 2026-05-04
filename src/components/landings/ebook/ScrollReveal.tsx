"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

/** Smooth deceleration — similar feel to typical Framer marketing pages */
const easeEditorial = [0.16, 1, 0.3, 1] as const;

const defaultViewport = {
  once: true,
  margin: "-56px 0px -12% 0px" as const,
  amount: 0.18 as const,
};

type MotionDivProps = ComponentProps<typeof motion.div>;
type MotionUlProps = ComponentProps<typeof motion.ul>;
type MotionLiProps = ComponentProps<typeof motion.li>;

function ReducedMotionDiv({
  reduceMotion,
  className,
  children,
  motionProps,
}: {
  reduceMotion: boolean;
  className?: string;
  children: ReactNode;
  motionProps: Omit<MotionDivProps, "children" | "className">;
}) {
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

function ReducedMotionUl({
  reduceMotion,
  className,
  children,
  motionProps,
}: {
  reduceMotion: boolean;
  className?: string;
  children: ReactNode;
  motionProps: Omit<MotionUlProps, "children" | "className">;
}) {
  if (reduceMotion) {
    return <ul className={className}>{children}</ul>;
  }
  return (
    <motion.ul className={className} {...motionProps}>
      {children}
    </motion.ul>
  );
}

function ReducedMotionLi({
  reduceMotion,
  className,
  children,
  motionProps,
}: {
  reduceMotion: boolean;
  className?: string;
  children: ReactNode;
  motionProps: Omit<MotionLiProps, "children" | "className">;
}) {
  if (reduceMotion) {
    return <li className={className}>{children}</li>;
  }
  return (
    <motion.li className={className} {...motionProps}>
      {children}
    </motion.li>
  );
}

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
  return (
    <ReducedMotionDiv
      reduceMotion={!!reduceMotion}
      className={className}
      motionProps={{
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: defaultViewport,
        transition: { duration, delay, ease: easeEditorial },
      }}
    >
      {children}
    </ReducedMotionDiv>
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
  return (
    <ReducedMotionDiv
      reduceMotion={!!reduceMotion}
      className={className}
      motionProps={{
        initial: "hidden",
        whileInView: "visible",
        viewport: defaultViewport,
        variants: makeStaggerContainer(staggerChildren, delayChildren),
      }}
    >
      {children}
    </ReducedMotionDiv>
  );
}

export type ScrollRevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollRevealItem({ children, className }: ScrollRevealItemProps) {
  const reduceMotion = useReducedMotion();
  return (
    <ReducedMotionDiv
      reduceMotion={!!reduceMotion}
      className={className}
      motionProps={{ variants: staggerItem }}
    >
      {children}
    </ReducedMotionDiv>
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
  return (
    <ReducedMotionUl
      reduceMotion={!!reduceMotion}
      className={className}
      motionProps={{
        initial: "hidden",
        whileInView: "visible",
        viewport: defaultViewport,
        variants: makeStaggerContainer(staggerChildren, delayChildren),
      }}
    >
      {children}
    </ReducedMotionUl>
  );
}

export type ScrollRevealLiProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollRevealLi({ children, className }: ScrollRevealLiProps) {
  const reduceMotion = useReducedMotion();
  return (
    <ReducedMotionLi
      reduceMotion={!!reduceMotion}
      className={className}
      motionProps={{ variants: staggerItem }}
    >
      {children}
    </ReducedMotionLi>
  );
}
