import React from "react";
import Header from "../common/Header";
import Top from "../common/Top";
import MainNews from "./MainNews";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";

const Main = () => {
  return (
    <>
      <Header />
      <Visual />
      <Vids />
      <Pics />
      <MainNews />
      <Top />
    </>
  );
};

export default Main;
