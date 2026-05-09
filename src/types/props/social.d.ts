import type { SVGProps } from "react";

export interface ISocialProps extends SVGProps<SVGSVGElement> {
  url: string;
  size: string | number;
  /** `"icon"` = solo SVG (p. ej. dentro de un `<a>` que envuelve toda la card) */
  variant?: "link" | "icon";
}
