import React from "react";

interface CarouselIconProps {
  size?: string;
  color?: string;
}

const CarouselIcon: React.FC<CarouselIconProps> = ({
  size = "100%",
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 31.25"
      x="0px"
      y="0px"
      width={size}
      height={size}
    >
      <g fillRule="evenodd">
        <rect width="21" height="20.5" rx="3" fill={color} />
        <path
          d="M23 5.03c.73.05 1.1.17 1.47.37.48.26.87.65 1.13 1.13.26.5.4.98.4 2.32v12.3c0 1.34-.14 1.83-.4 2.32a2.8 2.8 0 0 1-1.13 1.13c-.5.26-.98.4-2.32.4H8.85c-1.34 0-1.83-.14-2.32-.4a2.73 2.73 0 0 1-1.13-1.13c-.2-.37-.32-.74-.37-1.47h12.84c1.79 0 2.43-.19 3.08-.53a3.63 3.63 0 0 0 1.52-1.52c.34-.65.53-1.3.53-3.08V5.03z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default CarouselIcon;
