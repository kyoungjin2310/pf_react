import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function MainNews() {
  const { news } = useSelector((state) => state.newsReducer);
  //로컬저장소에서 데이터를 받아와서 json형태로 반환
  const getLocalData = () => {
    const data = localStorage.getItem("post");

    if (data) {
      return JSON.parse(data);
    } else {
      return news;
    }
  };

  const [Posts] = useState(getLocalData());

  useEffect(() => {
    if (
      !localStorage.getItem("post") ||
      localStorage.getItem("post").length <= 2
    ) {
      localStorage.setItem("post", JSON.stringify(news));
    }
    console.log(localStorage.getItem("post"));
  }, [news]);

  return (
    <section id="news">
      {Posts.map((post, idx) => {
        if (idx < 4) {
          return (
            <article key={idx}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </article>
          );
        }
      })}
    </section>
  );
}

export default MainNews;
