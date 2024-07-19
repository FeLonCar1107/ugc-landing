import { useEffect } from "react";

const useCustomCursor = () => {
  useEffect(() => {
    const cursorSecondaryElement = document.getElementById("cursor-two");
    const cursorTertiaryElement = document.getElementById("cursor-tree");

    const handleMouseEnter = () => {
      cursorSecondaryElement?.classList.add("hover", "hover-2");
      cursorTertiaryElement?.classList.add("hover", "hover-2");
    };

    const handleMouseLeave = () => {
      cursorSecondaryElement?.classList.remove("hover", "hover-2");
      cursorTertiaryElement?.classList.remove("hover", "hover-2");
    };

    const hoverTargets = document.querySelectorAll(
      ".hover-target, .hover-target-2",
    );
    hoverTargets.forEach((target) => {
      target.addEventListener("mouseover", handleMouseEnter);
      target.addEventListener("mouseout", handleMouseLeave);
    });

    const handleHoverLink = (selector: string, wrapClass: string) => {
      const hoverLinkElement = document.querySelector(selector);
      const bodyChangeElement = document.body;
      hoverLinkElement?.addEventListener("mouseenter", () => {
        bodyChangeElement.classList.add(wrapClass);
      });
      hoverLinkElement?.addEventListener("mouseleave", () => {
        bodyChangeElement.classList.remove(wrapClass);
      });
    };

    handleHoverLink(".logo", "logo-wrap");
    handleHoverLink(".img-1", "img-1-wrap");
    handleHoverLink(".img-2", "img-2-wrap");
    handleHoverLink(".img-3", "img-3-wrap");
    handleHoverLink(".img-4", "img-4-wrap");

    return () => {
      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseover", handleMouseEnter);
        target.removeEventListener("mouseout", handleMouseLeave);
      });
    };
  }, []);
};

export default useCustomCursor;
