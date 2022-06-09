import { useEffect, useRef, useState } from "react";

function Location() {
  //윈도우 전역객체에 있는 kakao키값을 바로 변수로 비구조화 할당
  const { kakao } = window;
  const info = [
    {
      title: "Main",
      latlng: new kakao.maps.LatLng(37.51270773913474, 127.06069417509839),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(126, 114),
      imgPos: {
        offset: new kakao.maps.Point(63, 114),
      },
    },
    {
      title: "Branch",
      latlng: new kakao.maps.LatLng(37.5188715541183, 127.12528957675329),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(126, 114),
      imgPos: {
        offset: new kakao.maps.Point(63, 114),
      },
    },
  ];
  const [Location, setLocation] = useState(null);
  const [Info, setInfo] = useState(info);
  const [Index, setIndex] = useState(0);
  const container = useRef(null);
  const btns = useRef(null);
  const option = {
    center: Info[Index].latlng,
    level: 3,
  };
  const imageSrc = Info[Index].imgSrc;
  const imageSize = Info[Index].imgSize;
  const imageOption = Info[Index].imgPos;

  //마커이미지 인스턴스 생성
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  //위치 인스턴스 생성
  const markerPosition = Info[Index].latlng;

  //위치 인스턴스 값을 인수로 해서 마커 인스턴스 생성
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
  });
  //최종 마커 호출
  useEffect(() => {
    container.current.innerHTML = "";

    //지도 인스턴스 생성
    const map_instance = new kakao.maps.Map(container.current, option);
    function setZoomable(zoomable) {
      // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
      map_instance.setZoomable(zoomable);
    }

    setZoomable(false);
    const handleResize = () => {
      console.log("브라우저 리사이즈 마커 가운데 고정");
      map_instance.setCenter(Info[Index].latlng);
    };
    //마커 출력
    marker.setMap(map_instance);
    //인스턴스값을 state에 담아서 관리
    setLocation(map_instance);

    //지도타입 컨트롤바 출력
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

    //지도 줌 컨트롤바 출력
    const zoomControl = new kakao.maps.ZoomControl();
    map_instance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    //브라우저 리사이즈시 마커 중앙 유지
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [Index]);
  return (
    <div className="Map">
      <div id="map" ref={container}></div>
      <div className="btnSet">
        <ul className="branch" ref={btns}>
          {Info.map((info, idx) => {
            let on = "";
            Index === idx ? (on = "on") : (on = "");
            return (
              <li key={idx} onClick={() => setIndex(idx)} className={on}>
                {info.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Location;
