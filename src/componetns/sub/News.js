import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { path } from "../../api";

function News() {
  const [News, setNews] = useState([]);
  useEffect(() => {
    axios.get(`${path}/DB/news.json`).then((json) => {
      setNews(json.data.news);
    });
  }, []);

  return (
    <>
      <Layout name={"News"} title={"News"}>
        {News.map((item, idx) => {
          return (
            <article key={item.id}>
              <Link>
                <h3>{item.title}</h3>
                <p>{item.txt}</p>
              </Link>
            </article>
          );
        })}
      </Layout>
    </>
  );
}

export default News;
