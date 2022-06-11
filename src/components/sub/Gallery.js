import Layout from "../common/Layout";

function Gallery() {
  const depthTwo = [
    { name: "Gallery", path: "/pr/gallery" },
    { name: "Youtube", path: "/pr" },
  ];
  return (
    <Layout name={"Gallery"} depthTwo={depthTwo}>
      <p>갤러리 컨텐츠 페이지 입니다.</p>
    </Layout>
  );
}

export default Gallery;
