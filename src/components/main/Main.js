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
      <Pics />
      <Vids />
      <MainNews />
    </>
  );
};

export default Main;
