import Layout from "../common/Layout";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-component";
import Popup from "../common/Popup";
import Loader from "../common/Loader";

function Gallery() {
  const frame = useRef(null);
  const input = useRef(null);
  const pop = useRef(null);
  const [Items, setItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [EnableClick, setEnableClick] = useState(true);
  const [Index, setIndex] = useState(0);
  const masonryOptions = {
    transitionDuration: "0.5s",
  };
  const depthTwo = [
    { name: "Gallery", path: "/pr/gallery" },
    { name: "Youtube", path: "/pr" },
  ];

  const getFlickr = async (opt) => {
    const key = "f214f4f8200fa66223b5d3c4cc803bbd";
    const method_search = "flickr.photos.search";
    const method_user = "flickr.photosets.getPhotos";
    const photoset_id = "72177720299755526";

    let url = "";

    if (opt.type === "search") {
      url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&user_id=${opt.user}&tags=${opt.tags}&format=json&nojsoncallback=1`;
      await axios.get(url).then((json) => {
        //만약 검색 결과가 없다면 경고창 띄우고 종료
        if (json.data.photos.photo.length === 0)
          return alert("해당검색어의 결과이미지 없습니다.");
        setItems(json.data.photos.photo);
        console.log(json.data.photos.photo);
      });
    }
    if (opt.type === "user") {
      url = `https://www.flickr.com/services/rest/?method=${method_user}&photoset_id=${photoset_id}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json&user_id=${opt.user}`;
      await axios.get(url).then((json) => {
        //만약 검색 결과가 없다면 경고창 띄우고 종료
        if (json.data.photoset.photo.length === 0)
          return alert("해당검색어의 결과이미지 없습니다.");
        setItems(json.data.photoset.photo);
        console.log(json.data.photoset.photo);
      });
    }

    setTimeout(() => {
      frame.current.classList.add("on");
      setLoading(false);

      setTimeout(() => {
        setEnableClick(true);
      }, 2000); //frame요소의 transition시간까지 지연
    }, 1000); //데이터준비 완료될때까지 지연
  };

  const showSearch = () => {
    const result = input.current.value.trim();

    input.current.value = "";
    if (!result) return alert("검색어를 입력하세요");

    if (EnableClick) {
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove("on");
      getFlickr({
        type: "search",
        tags: result,
        user: "192490779%40N06",
      });
    }
  };

  useEffect(() => {
    getFlickr({
      type: "user",
      count: 50,
      user: "192490779%40N06",
    });
  }, []);

  return (
    <>
      <Layout name={"Gallery"} title={"Gallery"} depthTwo={depthTwo}>
        {Loading && <Loader />}
        <div className="searchBox">
          <input
            type="text"
            ref={input}
            placeholder="검색어를 입력하세요"
            onKeyUp={(e) => {
              if (e.key === "Enter") showSearch();
            }}
          />
          <button onClick={showSearch}>SEARCH</button>
        </div>

        <div className="frame" ref={frame}>
          <Masonry elementType={"div"} options={masonryOptions}>
            {Items.map((item, idx) => {
              return (
                <article key={idx}>
                  <div className="inner">
                    <div
                      className="pic"
                      onClick={() => {
                        pop.current.open();
                        setIndex(idx);
                      }}
                    >
                      <img
                        src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
                        alt={item.title}
                      />
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              );
            })}
          </Masonry>
        </div>
      </Layout>

      {/* 컴포넌트자체를 useRef로 참조 */}
      <Popup ref={pop}>
        {Items.length !== 0 && (
          <img
            src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
            alt={Items[Index].title}
          />
        )}
      </Popup>
    </>
  );
}

export default Gallery;
