import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Top = () => {
  const topBace = 700;
  const [Top, setTop] = useState(false);
  const activation = () => {
    const scroll = window.scrollY;
    if (scroll >= window.innerHeight - topBace) {
      setTop(true);
    } else {
      setTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", activation);
    console.log(Top, "top");
    return () => {
      window.removeEventListener("scroll", activation);
    };
  }, []);
  return (
    <button
      className={Top ? "top on" : "top"}
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
