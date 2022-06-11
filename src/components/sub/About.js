import React, { useEffect } from "react";
import Layout from "../common/Layout";
import { aboutList, aboutSubTitle, aboutExplanTitle } from "../../api/data";

const About = () => {
  const depthTwo = [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/about/team" },
  ];
  useEffect(() => {
    document.body.style.background = "#000";
    return () => {
      document.body.style.background = "#fff";
    };
  }, []);

  return (
    <Layout
      name={"About"}
      title={
        <>
          A DESIGN STUDIO<span> RESEARCH STRATEGY</span>
        </>
      }
      depthTwo={depthTwo}
    >
      <article className="info">
        <div className="infoSubTxt">
          <strong>Neige</strong>
          <span>About Us</span>
          <ul>
            {aboutSubTitle.map((item, idx) => {
              return <li>{item}</li>;
            })}
          </ul>
          <span>Thinking</span>
        </div>
        <div className="infoWrap">
          <div className="pic">
            <img
              src="https://images.unsplash.com/photo-1633904275835-4e0e2b7e0a49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              alt="about visual"
            />
          </div>
        </div>
        <div className="infoTxt">
          <ul className="txt">
            {aboutList.map((item, idx) => {
              return (
                <li key={idx}>
                  <h3 className="title">{item.title}</h3>
                  <p>{item.txt}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
      <article className="infoExplan">
        <div className="infoTxt">
          <h3 className="title">{aboutExplanTitle}</h3>
          <ul className="txt">
            {aboutList.map((item, idx) => {
              return (
                <li key={idx}>
                  <h3 className="title">{item.title}</h3>
                  <p>{item.txt}</p>
                </li>
              );
            })}
          </ul>
          <div className="pic">
            <img
              src="https://images.unsplash.com/photo-1633904275835-4e0e2b7e0a49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              alt="about visual"
            />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default About;
