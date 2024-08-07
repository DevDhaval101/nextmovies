"use client";

import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";

const TV = () => {
  const [tvPageNum, setTvPageNum] = useState(1);
  const [tvShows, setTvShows] = useState([]);

  const fetchTvShows = async (page) => {
    try {
      const res = await fetch(`/api/tv/populer/${page}`);
      const data = await res.json();
      return data.results;
    } catch (error) {
      console.log("Error fetchiong TV Data", error);
    }
  };

  // save tvshows between page navigation or reload

  useEffect(() => {
    const storedPageNum = JSON.parse(sessionStorage.getItem("tvPageNum"));
    const storedTvShows = JSON.parse(sessionStorage.getItem("tvShows"));

    if (storedTvShows) {
      setTvShows(storedTvShows);
    }
    if (storedPageNum) {
      setTvPageNum(storedPageNum);
    } else {
      loadTvShows(1);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tvPageNum", JSON.stringify(tvPageNum));
    sessionStorage.setItem("tvShows", JSON.stringify(tvShows));
  }, [tvShows, tvPageNum]);

  const loadTvShows = async (page) => {
    const results = await fetchTvShows(page);
    const newTvShows = results.filter(
      (newTvShow) =>
        !tvShows.some((existingShow) => existingShow.id === newTvShow.id)
    );

    setTvShows((prevShows) => [...prevShows, ...newTvShows]);
  };

  useEffect(() => {
    if (tvPageNum > 1) {
      loadTvShows(tvPageNum);
    }
  }, [tvPageNum]);

  // infinite scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      sessionStorage.setItem("scrollY", window.scrollY);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, sessionStorage.getItem("scrollY"));
    }, 1000);
  });

  const handleScroll = (e) => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        setTvPageNum((pre) => pre + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section>
      <Navbar />
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {tvShows.map((tvShow) => (
          <Link href={`/video-tv/${tvShow.id}`} key={tvShow.id}>
            <Card {...tvShow} key={tvShow.id}></Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TV;
