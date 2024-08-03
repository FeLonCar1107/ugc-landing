import { useEffect } from "react";

export const usePictureCarousel = (numberOfPictures: number) => {
  useEffect(() => {
    const carousel = document.querySelector(".pictures-carousel");
    const pictures = carousel?.querySelectorAll(".picture");
    const arrowButtons =
      document.querySelectorAll<HTMLButtonElement>(".picture-arrow");

    const showHideArrows = () => {
      const scrollWidth =
        (carousel?.scrollWidth ?? 0) - (carousel?.clientWidth ?? 0);
      arrowButtons[0].style.display =
        carousel?.scrollLeft === 0 ? "none" : "block";
      arrowButtons[1].style.display =
        carousel?.scrollLeft === scrollWidth ? "none" : "block";
    };

    const handleArrowClick = (button: HTMLButtonElement) => {
      const pictureWidth = pictures ? pictures[0]?.clientWidth : 0;
      if (button.id === "left-picture-arrow") {
        if (carousel) {
          carousel.scrollLeft -=
            pictureWidth + (window.innerWidth <= 800 ? 0 : 10);
        }
      } else {
        if (carousel) {
          carousel.scrollLeft +=
            pictureWidth + (window.innerWidth <= 800 ? 0 : 10);
        }
      }
      setTimeout(showHideArrows, 60);
    };

    arrowButtons.forEach((button) => {
      button.addEventListener("click", () => handleArrowClick(button));
    });

    showHideArrows();
  }, [numberOfPictures]);
};
