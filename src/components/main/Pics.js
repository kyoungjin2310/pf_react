import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Popup from "../common/Popup";

function Pics() {
  const flickr = useSelector((store) => store.flickrReducer.photo);
  const [Index, setIndex] = useState(0);
  const pop = useRef(null);

  return (
    <>
      <section id="gallery">
        <h2 className="title">The Projects</h2>
        <p className="txt">
          We make digital experiences that use technology to create emotions
          Strategy, design, content and technology Ok, you’ve made it to the
          last section. Phew. This is where we tell you that we make “digital
          experiences,” and where you ask us what the hell that’s supposed to
          mean. And where we ask you to mind your language, but then level with
          you, and tell you that to be honest it’s a bit of a catch-all term. A
          digital experience could be a website. Like a straight up normal
          website for your company, one that has an “about” page, and maybe some
          info about your services. Sort of like the page you are on right now.
          Or it could be a bit more experimental. It could be a game, or an
          installation.
        </p>
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
