import { useState, useEffect } from "react";
import { dummyPosts } from "../../asset/news";
function MainNews() {
  //로컬저장소에서 데이터를 받아와서 json형태로 반환
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
    <section id="news">
      <h2 className="title">What is it that we actually do?</h2>
      {Posts.map((post, idx) => {
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
