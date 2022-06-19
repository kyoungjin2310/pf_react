import React, { useRef, useEffect } from "react";
import { workList } from "../../asset/data";
import Top from "../common/Top";

const Work = () => {
  const workTitle = useRef(null);
  useEffect(() => {}, []);
  return (
    <>
      <div className="Work">
        <h2 className="workTitle" ref={workTitle}>
          <span>WORK</span>
        </h2>
        <ul className="workList">
          {workList.map((item, idx) => {
            return (
              <li key={idx} className={idx % 2 === 0 && "odd"}>
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
      </div>
      <Top />
    </>
  );
};

export default Work;
