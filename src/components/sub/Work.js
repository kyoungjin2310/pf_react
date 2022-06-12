import React, { useRef, useEffect } from "react";
import { workList } from "../../api/data";

const Work = () => {
  const workTitle = useRef(null);
  useEffect(() => {}, []);
  return (
    <div className="Work">
      <h2 className="workTitle" ref={workTitle}>
        Work
      </h2>
      <ul className="workList">
        {workList.map((item, idx) => {
          return (
            <li key={idx}>
              <div className="pic">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="txt">
                <h3>{item.title}</h3>
                <p>{item.txt}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Work;
