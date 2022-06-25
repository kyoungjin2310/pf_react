import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Popup from "../common/styled/popup/Popup";
import { pics } from "../../asset/data";
function Pics() {
  const flickr = useSelector((store) => store.flickrReducer.photo);
  const [Index, setIndex] = useState(0);
  const pop = useRef(null);

  return (
    <>
      <section id="gallery">
        <h2 className="title">{pics.title}</h2>
        <p className="txt">{pics.txt}</p>
        <div className="picWrap">
          {flickr.map((item, idx) => {
            if (idx < 8) {
              return (
                <article
                  className={
                    idx % 2 === 0
                      ? `picList pic${idx + 1}`
                      : `picList pic${idx + 1} even`
                  }
                  key={idx}
                >
                  <div
                    className="pic"
                    onClick={() => {
                      setIndex(idx);
                      pop.current.open();
                    }}
                  >
                    <div className="imgWrap">
                      <img
                        src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                        alt={item.title}
                      />
                    </div>
                    <h3 className="txtTitle">{item.title}</h3>
                  </div>
                </article>
              );
            }
          })}
        </div>
      </section>
      <Popup ref={pop}>
        {flickr.length !== 0 && (
          <img
            src={`https://live.staticflickr.com/${flickr[Index].server}/${flickr[Index].id}_${flickr[Index].secret}_b.jpg`}
            alt={flickr[Index].title}
          />
        )}
      </Popup>
    </>
  );
}

export default Pics;
