import { useEffect } from "react";

export const useVideoCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector(".videos-carousel");
    const arrowButtons =
      document.querySelectorAll<HTMLButtonElement>(".video-arrow");

    const showHideArrows = () => {
      const scrollWidth =
        (carousel?.scrollWidth ?? 0) - (carousel?.clientWidth ?? 0);
      arrowButtons[0].style.display =
        carousel?.scrollLeft === 0 ? "none" : "block";
      arrowButtons[1].style.display =
        carousel?.scrollLeft === scrollWidth ? "none" : "block";
    };

    arrowButtons?.forEach((button) => {
      const carouselWidth = carousel?.clientWidth ?? 0;
      const imagesToShow =
        window.innerWidth <= 640
          ? 1
          : window.innerWidth <= 800
          ? 2
          : window.innerWidth <= 1200
          ? 3
          : 4;
      const slideWidth = carouselWidth / imagesToShow;

      const handleClick = () => {
        if (carousel) {
          if (button.id === "left-video-arrow") {
            carousel.scrollLeft -= slideWidth;
          } else {
            carousel.scrollLeft += slideWidth;
          }
        }
        setTimeout(() => showHideArrows(), 60);
      };

      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("click", handleClick);
      };
    });

    showHideArrows();
  }, []);
};
