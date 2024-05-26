import { useEffect } from "react";

export const usePictureCarousel = () => {
  useEffect(() => {
    const carousel = document.querySelector(".pictures-carousel");
    const firstImage = carousel?.querySelectorAll(".picture")[0];
    const arrowButtons =
      document.querySelectorAll<HTMLButtonElement>(".picture-arrow");

    let isDragStart = false;
    let isDragging = false;
    let prevPageX = 0;
    let prevScrollLeft = 0;
    let positionDiff = 0;

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

    const autoSlide = () => {
      if (
        carousel?.scrollLeft ==
        (carousel?.scrollWidth ?? 0) - (carousel?.clientWidth ?? 0)
      )
        return;

      positionDiff = Math.abs(positionDiff);
      let firstImageWidth = firstImage?.clientWidth ?? 0 + 10;
      let valDifference = firstImageWidth - positionDiff;
      if (carousel) {
        if (positionDiff > firstImageWidth / 3) {
          carousel.scrollLeft += valDifference;
        } else {
          carousel.scrollLeft -= positionDiff;
        }
      }
    };

    const dragStart = (event: any) => {
      isDragStart = true;
      prevPageX = event.pageX || event.touches[0].pageX;
      prevScrollLeft = carousel?.scrollLeft || 0;
    };

    const dragging = (event: any) => {
      if (!isDragStart) return;
      event.preventDefault();
      isDragging = true;
      positionDiff = (event.pageX || event.touches[0].pageX) - prevPageX;
      if (carousel) {
        carousel.classList.add("dragging");
        carousel.scrollLeft = prevScrollLeft - positionDiff;
      }
      showHideArrows();
    };

    const dragStop = () => {
      isDragStart = false;
      if (carousel) carousel.classList.remove("dragging");
      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    };

    carousel?.addEventListener("mousedown", dragStart);
    carousel?.addEventListener("touchstart", dragStart);

    carousel?.addEventListener("mousemove", dragging);
    carousel?.addEventListener("touchmove", dragging);

    carousel?.addEventListener("mouseup", dragStop);
    carousel?.addEventListener("mouseup", dragStop);
    carousel?.addEventListener("touchend", dragStop);

    return () => {
      carousel?.removeEventListener("mousedown", dragStart);
      carousel?.removeEventListener("touchstart", dragStart);

      carousel?.removeEventListener("mousemove", dragging);
      carousel?.removeEventListener("touchmove", dragging);

      carousel?.removeEventListener("mouseup", dragStop);
      carousel?.removeEventListener("mouseleave", dragStop);
      carousel?.removeEventListener("touchend", dragStop);
    };
  }, []);
};
