"use client";

import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Movies from "@/components/Movies";
import Tv from "@/components/Tv";

const Home = () => {

  return (
    <>
      <Navbar />
      <Searchbar />
      <Movies />
      <Tv />
    </>
  );
};

export default Home;
