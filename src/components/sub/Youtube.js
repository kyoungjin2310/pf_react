import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Popup from "../common/Popup";

function Youtube() {
  const [Vids, setVids] = useState([]);
  const [Index, setIndex] = useState(0);
  const pop = useRef(null);
  const depthTwo = [
    { name: "Gallery", path: "/pr/gallery" },
    { name: "Youtube", path: "/pr" },
  ];

  const subTxt =
    "This is Neige's video. Please click the video image in the list.";

  const handlePopup = (index) => {
    pop.current.open();
    setIndex(index);
  };

  const fetchYoutube = () => {
    const key = "AIzaSyC3omc-8Wk_cZwj-pkpAlVSxJizrP0IL9k";
    const playlist = "PLTncuNK6QrZME9vBo7RMvsNoxAPUG8LUw";
    const num = 8;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
    axios.get(url).then((json) => {
      setVids(json.data.items);
    });
  };

  useEffect(fetchYoutube, []);

  return (
    <>
      <Layout
        name={"Youtube"}
        title={"Neige Youtube"}
        depthTwo={depthTwo}
        subTxt={subTxt}
      >
        {Vids.map((vid, idx) => {
          const tit = vid.snippet.title;
          const desc = vid.snippet.description;
          const date = vid.snippet.publishedAt;

          return (
            <article key={idx}>
              <div className="num">
                <span>{idx < 10 ? `0${idx + 1}` : idx + 1}</span>
              </div>
              <div className="txt">
                <h3>{tit}</h3>
                <p>{desc}</p>
                <span>{date.split("T")[0]}</span>
              </div>
              <div className="pic" onClick={() => handlePopup(idx)}>
                <img
                  src={vid.snippet.thumbnails.standard.url}
                  alt={vid.title}
                />
              </div>
            </article>
          );
        })}
      </Layout>
      <Popup ref={pop}>
        <>
          {Vids.length !== 0 && (
            <iframe
              src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
              frameBorder="0"
            ></iframe>
          )}
        </>
      </Popup>
    </>
  );
}

export default Youtube;
