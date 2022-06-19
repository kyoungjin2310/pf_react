import React from "react";
import Header from "../common/Header";
import MainNews from "./MainNews";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";

const Main = () => {
  return (
    <>
      <Header />
      <Visual />
      <MainNews />
      <Pics />
      <Vids />
    </>
  );
};

export default Main;
