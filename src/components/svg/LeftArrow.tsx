import React from "react";

interface LeftArrowIconProps {
  color?: string;
  size?: string;
}

const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({
  color = "#000000",
  size = "100%",
}) => {
  return (
    <div className="cursor-pointer hover:opacity-70">
      <svg
        viewBox="-19.04 0 75.803 75.803"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        width={size}
        height={size}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g
            id="Group_64"
            data-name="Group 64"
            transform="translate(-624.082 -383.588)"
          >
            <path
              id="Path_56"
              data-name="Path 56"
              d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z"
              fill={color}
            ></path>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LeftArrowIcon;
