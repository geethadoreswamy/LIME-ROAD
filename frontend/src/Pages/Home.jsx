import React from "react";
import NavBar2 from "../Components/NavBar2";
import Navbar from "../Components/NavBar";
import Carousel from "../Components/Carousel";
import Banner from "../Components/Banner";
import CardList from "../Components/CardList";

function Home() {
  return (
    <>
      <Navbar />
      <NavBar2 />
      <Carousel />
      <Banner />
      <CardList />
    </>
  );
}

export default Home;
