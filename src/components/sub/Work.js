import React, { useRef, useEffect, useState } from "react";
import { workList } from "../../asset/data";
import Scroll from "../common/styled/scroll/Scroll";
import Top from "../common/Top";

const Work = () => {
  const workTitle = useRef(null);
  return (
    <>
      <Scroll className="Work">
        <h2 className="workTitle ani-orderTitle" ref={workTitle}>
          <span>WORK</span>
        </h2>
        <ul className="workList">
          {workList.map((item, idx) => {
            return (
              <li key={idx} className={idx % 2 === 0 ? "list odd" : "list"}>
                <div className="pic">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="txt">
                  <h3>
                    <span>{item.title}</span>
                  </h3>
                  <p>
                    <span>{item.txt}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Scroll>
      <Top />
    </>
  );
};

export default Work;
