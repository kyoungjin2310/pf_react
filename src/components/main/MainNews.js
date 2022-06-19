import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MainNews() {
  const { news } = useSelector((state) => state.newsReducer);
  const getLocalData = () => {
    const data = localStorage.getItem("post");
    return JSON.parse(data);
  };
  const [Posts, setPosts] = useState(getLocalData());

  useEffect(() => {
    console.log(news);
    console.log(localStorage.getItem("post") === null);
  }, [news, Posts, localStorage]);

  return (
    <section id="news">
      <h2 className="title">What is it that we actually do?</h2>
      {Posts &&
        Posts.map((post, idx) => {
          if (idx < 4) {
            return (
              <article className="list" key={idx}>
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
  );
}

export default MainNews;
