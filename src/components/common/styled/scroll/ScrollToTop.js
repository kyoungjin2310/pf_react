import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const aniContent = document.querySelectorAll(".active");

  const activation = () => {
    aniContent.forEach((content, idx) => {
      aniContent[idx].classList.remove("active");
    });
  };

  useEffect(() => {
    activation();
    return () => {
      window.scrollTo(0, 0);
    };
  }, [pathname]);

  return null;
}
