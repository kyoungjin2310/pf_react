import { useState } from "react";
import { useSelector } from "react-redux";

function MainNews() {
  const { news } = useSelector((state) => state.newsReducer);

  const [Posts] = useState(news);

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
