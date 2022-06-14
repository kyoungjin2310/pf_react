import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Top from "./Top";
function Layout({ name, title, children, depthTwo, subTxt }) {
  const frame = useRef(null);
  const style = { textDecoration: "underline" };

  useEffect(() => {
    frame.current.classList.add("on");
  }, []);

  return (
    <>
      <section className={`content ${name}`} ref={frame}>
        <div className="inner">
          <div className="titleWrap">
            <h2>{title}</h2>
            {subTxt && <p>{subTxt}</p>}
            {depthTwo && (
              <ul className="depth2">
                {depthTwo.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink activeStyle={style} to={item.path}>
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {children}
        </div>
      </section>
      <Top />
    </>
  );
}

Layout.defaultProps = {
  depthTwo: null,
  subTxt: null,
};

export default Layout;