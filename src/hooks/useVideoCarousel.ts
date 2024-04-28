export const useVideoCarousel = () => {
  const carousel = document.querySelector(".video-carousel");
  const arrowButtons = document.querySelectorAll(".video-arrow");
  const firstVideoWidth = carousel?.querySelector(".video")?.offsetWidth;

  let isDragging: boolean = false,
    startX: number,
    startScrollLeft: number;

  arrowButtons?.forEach((button) => {
    button.addEventListener("click", () => {
      if (carousel) {
        carousel.scrollLeft +=
          button.id === "left" ? -firstVideoWidth : firstVideoWidth;
      }
    });
  });

  const dragStart = (event: any) => {
    isDragging = true;
    carousel?.classList.add("dragging");
    startX = event.pageX;
    startScrollLeft = carousel?.scrollLeft || 0;
  };

  const dragging = (event: any) => {
    if (!isDragging) return;
    if (carousel) {
      carousel.scrollLeft = startScrollLeft - (event.pageX - startX);
    }
  };

  const dragStop = () => {
    isDragging = false;
    carousel?.classList.remove("dragging");
  };

  carousel?.addEventListener("mousedown", dragStart);
  carousel?.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
};
