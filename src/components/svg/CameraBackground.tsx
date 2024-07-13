import React, { ReactNode } from "react";

interface CameraBackgroundProps {
  size?: number;
  color?: string;
  children?: ReactNode;
}

const CameraBackground: React.FC<CameraBackgroundProps> = ({
  size,
  color,
  children,
}) => {
  const viewBox = `0 0 ${size || 162} ${size || 153}`;

  return (
    <div
      style={{
        position: "relative",
        width: size || "100%",
        height: size || "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "rotate(-10deg)",
        filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.1))",
      }}
    >
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-13%",
          width: "120%",
          height: "120%",
        }}
      >
        <path
          d="M128.9 5.00023C143.7 10.4002 157.1 22.0002 160.3 36.2002C163.5 50.3002 156.6 67.0002 154.3 84.6002C152.1 102.2 154.6 120.6 147.5 133.4C140.5 146.2 123.9 153.3 108.3 153C92.6998 152.8 77.9998 145.2 62.6998 140.5C47.2998 135.7 31.2998 133.7 19.3998 125.3C7.49978 116.8 -0.300226 101.9 0.599774 87.6002C1.49977 73.3002 10.9998 59.6002 19.3998 47.2002C27.7998 34.7002 34.9998 23.4002 45.2998 15.9002C55.4998 8.30023 68.6998 4.50023 83.3998 2.30023C98.0998 0.100233 114.2 -0.49977 128.9 5.00023Z"
          fill={color || "#FDCDE9"}
        />
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default CameraBackground;
