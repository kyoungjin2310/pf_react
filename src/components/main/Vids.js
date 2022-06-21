import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import Popup from "../common/Popup";

function Vids() {
  const Vids = useSelector((store) => store.youtubeReducer.youtube);
  const [Index, setIndex] = useState(0);
  const pop = useRef(null);

  return (
    <>
      <section id="vids">
        <h2 className="title ani-content">Do we make apps products?</h2>
        <div className="ani-content">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation={false}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
              },
              1180: {
                slidesPerView: 3,
              },
            }}
          >
            {Vids.map((vid, idx) => {
              const tit = vid.snippet.title;
              const desc = vid.snippet.description;
              if (idx < 8) {
                return (
                  <SwiperSlide key={idx}>
                    <div
                      className={`inner list${idx}`}
                      onClick={() => {
                        setIndex(idx);
                        pop.current.open();
                      }}
                    >
                      <div className="pic">
                        <img
                          src={vid.snippet.thumbnails.standard.url}
                          alt={tit}
                        />
                      </div>
                      <div className="txtBox">
                        <h3 className="txtTitle">{tit}</h3>
                        <p className="txt">{desc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>
      </section>

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

export default Vids;
