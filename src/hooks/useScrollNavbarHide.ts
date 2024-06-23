import { useEffect, useState } from "react";

const useScrollNavbarHide = (initialVisibility = true) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      const rect = homeSection?.getBoundingClientRect();
      if (rect && window.scrollY >= rect.top && window.scrollY <= rect.bottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
};

export default useScrollNavbarHide;
