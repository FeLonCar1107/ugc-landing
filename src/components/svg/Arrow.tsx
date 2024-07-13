import React from "react";

interface SvgArrowProps {
  color?: string;
  size?: string | number;
  position?: "left" | "right" | "up" | "down";
}

const SvgArrow: React.FC<SvgArrowProps> = ({
  color = "#000000",
  size = "100%",
  position,
}) => {
  return (
    <svg
      fill={color}
      height={size}
      width={size}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
      className={`cursor-pointer hover:opacity-80 hover:scale-110 transition-all duration-300 ease-in-out ${
        position === "left" ? "transform rotate-180" : ""
      } ${position === "up" ? "transform rotate-90" : ""} ${
        position === "down" ? "transform rotate-90" : ""
      }`}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          id="XMLID_27_"
          d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255 s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0 c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
        ></path>
      </g>
    </svg>
  );
};

export default SvgArrow;
