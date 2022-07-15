import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Top from "../common/Top";
import Title from "../common/styled/Title/Title";
import Scroll from "../common/styled/scroll/Scroll";

function Layout({ name, title, children, depthTwo, subTxt }) {
  const subTitle = useRef(null);

  useEffect(() => {
    const content = document.querySelector(".content");
    const menu = document.querySelector("#mobileGnb");
    if (menu) {
      setTimeout(() => {
        content.classList.add("on");
        subTitle.current.show();
      }, 1000);
    } else {
      content.classList.add("on");
      subTitle.current.show();
    }
    return () => {
      content.classList.remove("on");
    };
  }, []);
  return (
    <>
      <Scroll className={`content ${name}`} baseLine={-700}>
        <div className="inner">
          <div className="titleWrap">
            <h2>
              <Title ref={subTitle} aniTitle={title} />
            </h2>
            {subTxt && <p className="ani-content4">{subTxt}</p>}
            {depthTwo && (
              <ul className="depth2">
                {depthTwo.map((item, index) => {
                  return (
                    <li key={index} className="ani-content3">
                      {(item.path === "blog" && (
                        <a
                          href="https://unbounce.com/blog/?ref=seoptimer.com"
                          target="_blank"
                        >
                          {item.name}
                        </a>
                      )) ||
                        (item.path === "sns" && (
                          <a
                            href="https://www.instagram.com/thedesignagency/"
                            target="_blank"
                          >
                            {item.name}
                          </a>
                        )) || <Link to={item.path}>{item.name}</Link>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {children}
        </div>
      </Scroll>
      <Top />
    </>
  );
}

export default Layout;
