import { useEffect } from "react";

const useCustomCursor = () => {
  useEffect(() => {
    const cursorDot = document.getElementById("cursor-one");
    const cursorOutline = document.getElementById("cursor-two");

    const handleMouseMove = (
      event: MouseEvent | { clientX: number; clientY: number },
    ) => {
      const { clientX: posX, clientY: posY } = event;
      if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate(
          {
            left: `${posX}px`,
            top: `${posY}px`,
          },
          {
            duration: 500,
            fill: "forwards",
          },
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
};

export default useCustomCursor;
