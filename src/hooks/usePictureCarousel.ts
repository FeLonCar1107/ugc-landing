import { useEffect } from "react";

export const usePictureCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector(".pictures-carousel");
    const firstImage = carousel?.querySelectorAll(".picture")[0];
    const arrowButtons =
      document.querySelectorAll<HTMLButtonElement>(".picture-arrow");

    const showHideArrows = () => {
      let scrollWidth =
        (carousel?.scrollWidth ?? 0) - (carousel?.clientWidth ?? 0);
      arrowButtons[0].style.display =
        carousel?.scrollLeft === 0 ? "none" : "block";

      arrowButtons[1].style.display =
        carousel?.scrollLeft === scrollWidth ? "none" : "block";
    };

    arrowButtons?.forEach((button) => {
      let firstImageWidth = firstImage?.clientWidth ?? 0 + 10;
      button.addEventListener("click", () => {
        if (carousel) {
          if (button.id === "left-picture-arrow") {
            carousel.scrollLeft -= firstImageWidth;
          } else {
            carousel.scrollLeft += firstImageWidth;
          }
        }
        setTimeout(() => showHideArrows(), 60);
      });
    });

    showHideArrows();
  }, []);
};
