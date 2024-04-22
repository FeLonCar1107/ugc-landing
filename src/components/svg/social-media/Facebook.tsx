import * as React from "react";
import { ISocialProps } from "@/types/social";

const Facebook = ({ url, size, color, ...props }: ISocialProps) => {
  return (
    <a href={url} target="_blank" className="cursor-pointer hover:scale-110 hover:transition-all hover:duration-300 hover:ease-in-out">
      <svg
        width={size}
        height={size}
        viewBox="0 0 534 531"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.667 267C533.667 119.724 414.276 0.333496 267 0.333496C119.724 0.333496 0.333496 119.724 0.333496 267C0.333496 400.101 97.8495 510.422 225.334 530.427V344.084H157.625V267H225.334V208.25C225.334 141.417 265.145 104.5 326.057 104.5C355.233 104.5 385.75 109.709 385.75 109.709V175.334H352.124C318.998 175.334 308.667 195.889 308.667 216.978V267H382.625L370.802 344.084H308.667V530.427C436.151 510.422 533.667 400.101 533.667 267Z"
          fill="#100F0D"
        />
      </svg>
    </a>
  );
};
export default Facebook;
