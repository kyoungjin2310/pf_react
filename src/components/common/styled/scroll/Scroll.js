import { useRef, useEffect, useState } from "react";
let secs = [];
function Scroll({ children, className, baseLine }) {
  const divScroll = useRef(null);
  const pos = useRef([]);
  const [Scrolled, setScrolled] = useState(0);
  const base = baseLine;

  const getPos = () => {
    pos.current = [];
    secs = divScroll.current?.querySelectorAll(".ani-content");
    for (const sec of secs) pos.current.push(sec.getBoundingClientRect().top);
  };

  const activation = () => {
    const scroll = window.scrollY;
    setScrolled(scroll);

    pos.current.map((pos, idx) => {
      if (scroll >= pos + base) {
        secs[idx].classList.add("active");
      }
    });
  };

  useEffect(() => {
    getPos();

    window.addEventListener("resize", getPos);
    window.addEventListener("scroll", activation);
    return () => {
      window.removeEventListener("resize", getPos);
      window.removeEventListener("scroll", activation);
    };
  }, []);

  return (
    <>
      <section ref={divScroll} className={className}>
        {children}
      </section>
    </>
  );
}

export default Scroll;
