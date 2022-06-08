import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function Layout({ name, title, children, depthTwo }) {
  const frame = useRef(null);
  const style = { textDecoration: "underline" };

  useEffect(() => {
    frame.current.classList.add("on");
  }, []);

  return (
    <section className={`content ${name}`} ref={frame}>
      <div className="inner">
        <div className="titleWrap">
          <h2>{title}</h2>
          {depthTwo && (
            <ul className="depth2">
              {depthTwo.map((item, index) => {
                return (
                  <li>
                    <NavLink activeStyle={style} to={`/${index}`}>
                      {item}
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
  );
}

Layout.defaultProps = {
  depthTwo: null,
};

export default Layout;
