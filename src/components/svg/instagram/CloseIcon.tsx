import React from "react";

interface CloseIconProps {
  size?: string;
  color?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  size = "100%",
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <g id="Menu / Close_MD">
          <path
            id="Vector"
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

export default CloseIcon;
