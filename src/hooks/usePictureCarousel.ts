import { useEffect } from "react";

export const usePictureCarousel = (numberOfPictures: number) => {
  useEffect(() => {
    const carousel = document.querySelector(".pictures-carousel");
    const arrowButtons =
      document.querySelectorAll<HTMLElement>(".picture-arrow");

    if (!carousel || arrowButtons.length < 2) return;

    const leftBtn = arrowButtons[0];
    const rightBtn = arrowButtons[1];

    const getSlides = () =>
      Array.from(
        carousel.querySelectorAll<HTMLElement>(".picture"),
      ) as HTMLElement[];

    const maxScrollLeft = () =>
      Math.max(0, carousel.scrollWidth - carousel.clientWidth);

    const updateActiveSlide = () => {
      const slides = getSlides();
      if (!slides.length) return;

      const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      let activeIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(slideCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          activeIndex = index;
        }
      });

      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeIndex);
      });
    };

    /** Align scroll position to the start edge of a slide so views are never half-cut */
    const scrollToSlideIndex = (index: number) => {
      const slides = getSlides();
      const slide = slides[index];
      if (!slide) return;

      const target = Math.min(slide.offsetLeft, maxScrollLeft());
      carousel.scrollTo({ left: target, behavior: "smooth" });
    };

    /** Slide whose left edge is closest to current scroll (which slide “owns” this page). */
    const nearestSlideIndexAtScrollStart = () => {
      const slides = getSlides();
      if (!slides.length) return 0;

      const left = carousel.scrollLeft;
      let nearest = 0;
      let bestDist = Infinity;

      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          nearest = i;
        }
      });

      return nearest;
    };

    const showHideArrows = () => {
      const max = maxScrollLeft();
      const tol = 4;
      leftBtn.style.display = carousel.scrollLeft <= tol ? "none" : "flex";
      rightBtn.style.display =
        carousel.scrollLeft >= max - tol ? "none" : "flex";
      updateActiveSlide();
    };

    const handleArrowClick = (button: HTMLElement) => {
      const slides = getSlides();
      if (!slides.length) return;

      const idx = nearestSlideIndexAtScrollStart();
      let targetIdx = idx;

      if (button.id === "left-picture-arrow") {
        targetIdx = Math.max(0, idx - 1);
      } else {
        targetIdx = Math.min(slides.length - 1, idx + 1);
      }

      scrollToSlideIndex(targetIdx);
      window.setTimeout(showHideArrows, 320);
    };

    const onLeft = () => handleArrowClick(leftBtn);
    const onRight = () => handleArrowClick(rightBtn);

    leftBtn.addEventListener("click", onLeft);
    rightBtn.addEventListener("click", onRight);
    carousel.addEventListener("scroll", showHideArrows, { passive: true });
    window.addEventListener("resize", showHideArrows);

    showHideArrows();
    updateActiveSlide();

    return () => {
      leftBtn.removeEventListener("click", onLeft);
      rightBtn.removeEventListener("click", onRight);
      carousel.removeEventListener("scroll", showHideArrows);
      window.removeEventListener("resize", showHideArrows);
    };
  }, [numberOfPictures]);
};
