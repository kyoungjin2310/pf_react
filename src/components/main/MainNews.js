import { useState, useEffect, useRef } from "react";
import { dummyPosts } from "../../asset/news";
import Popup from "../common/Popup";

function MainNews() {
  const [Index, setIndex] = useState(0);
  const pop = useRef(null);

  const getLocalData = () => {
    const data = localStorage.getItem("post");
    if (data) {
      return JSON.parse(data);
    } else {
      return dummyPosts;
    }
  };

  const [Posts] = useState(getLocalData());

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(Posts));
  }, []);
  return (
    <>
      <section id="news">
        <h2 className="title">What is it that we actually do?</h2>
        {Posts.map((post, idx) => {
          if (idx < 4) {
            return (
              <article
                className="list"
                key={idx}
                onClick={() => {
                  setIndex(idx);
                  pop.current.open();
                }}
              >
                <span className="num">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <div className="txtWrap">
                  <h3 className="txtTitle">{post.title}</h3>
                  <p className="txt">{post.content}</p>
                </div>
              </article>
            );
          }
        })}
      </section>
      <Popup ref={pop}>
        <article className="newsList">
          <div>
            <h3 className="newsListTitle">News</h3>
            <h4 className="txtTitle">{Posts[Index].title}</h4>
            <p className="txt">{Posts[Index].content}</p>
          </div>
        </article>
      </Popup>
    </>
  );
}

export default MainNews;
