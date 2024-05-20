import type { SVGProps } from "react";

export interface ISocialProps extends SVGProps<SVGSVGElement> {
  url: string;
  size: string | number;
}
