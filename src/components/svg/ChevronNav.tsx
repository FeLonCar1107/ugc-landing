import React from "react";

type Props = {
  direction?: "left" | "right";
  className?: string;
  "aria-hidden"?: boolean;
};

/**
 * Thin stroke chevrons for carousel-style controls (minimal vs. filled Arrow).
 */
export default function ChevronNav({
  direction = "right",
  className = "h-5 w-5",
  ...rest
}: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className} ${
        direction === "left" ? "rotate-180" : ""
      }`}
      stroke="currentColor"
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
