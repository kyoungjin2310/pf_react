import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Top = () => {
  const top = useRef();
  const topBace = 600;
  const activation = () => {
    const scroll = window.scrollY;
    if (scroll >= window.innerHeight - topBace) {
      top.current.classList.add("on");
    } else {
      top.current.classList.remove("on");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", activation);
    return () => {
      window.removeEventListener("scroll", activation);
    };
  }, []);
  return (
    <button
      className="top"
      ref={top}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <span className="h">top</span>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default Top;
