import { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { visualTitle } from "../../asset/mainData";

function Visual() {
  const cursor = useRef(null);
  const frame = useRef(null);
  let isCursor = false;
  const [ElNum, setElNum] = useState(0);
  const mouseMove = (e) => {
    if (!isCursor) return;
    const { clientX = 0, clientY = 0 } = e;
    cursor.current.style.left = clientX - 15 + "px";
    cursor.current.style.top = clientY - 15 + "px";
  };
  const prev = () => {
    setElNum((ElNum) =>
      ElNum === 0 ? (ElNum = visualTitle.length - 1) : --ElNum
    );
  };
  const next = () => {
    setElNum((ElNum) =>
      ElNum === visualTitle.length - 1 ? (ElNum = 0) : ++ElNum
    );
  };
  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    frame.current.addEventListener("mouseenter", () => {
      isCursor = true;
      cursor.current.style.display = "block";
    });
    frame.current.addEventListener("mouseleave", () => {
      isCursor = false;
      cursor.current.style.display = "none";
    });

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <figure id="visual" className="myScroll" ref={frame} onDrag={mouseMove}>
      {visualTitle.map((item, idx) => {
        return (
          <div
            className={idx === ElNum ? "visual active" : "visual"}
            key={idx}
            onMouseEnter={() =>
              (cursor.current.style = ` transform: translate(-50%, -50%)  scale(3) `)
            }
            onMouseLeave={() =>
              (cursor.current.style = ` transform: translate(-50%, -50%)  scale(4.2) `)
            }
          >
            <div className="inner">
              <h2 className="title">{item.title}</h2>
              <div className="pic">
                <img src={`${item.img}`} alt={`${item.title}`} />
              </div>
              <figcaption className="txt">{item.txt}</figcaption>
            </div>
          </div>
        );
      })}
      <div className="cursor" ref={cursor}></div>
      <div className="num">
        <strong>{ElNum + 1 < 10 ? `0${ElNum + 1}` : ElNum + 1}</strong>
        <span>
          {visualTitle.length < 10
            ? `0${visualTitle.length}`
            : visualTitle.length}
        </span>
      </div>
      <div className="btn">
        <button className="prev" onClick={prev}>
          <span className="h">prev</span>
          <svg viewBox="0 0 476.213 476.213">
            <polygon
              points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
	57.427,253.107 476.213,253.107 "
            />
          </svg>
        </button>
        <button className="next" onClick={next}>
          <span className="h">next</span>
          <svg viewBox="0 0 476.213 476.213">
            <polygon
              points="345.606,107.5 324.394,128.713 418.787,223.107 0,223.107 0,253.107 418.787,253.107 324.394,347.5 
	345.606,368.713 476.213,238.106 "
            />
          </svg>
        </button>
      </div>
    </figure>
  );
}

export default Visual;
