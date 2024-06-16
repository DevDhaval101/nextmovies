"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";

const TMDB_API_KEY = "af80426d7aa9331ce56cf89de748e5bd";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function getAiringTodayTvShows() {
  try {
    const res = await fetch('/api/tv/airing_today/1');
    const data = await res.json();
    // console.log("1 DATA", data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getPopulerTvShows() {
  try {
    const res = await fetch('/api/tv/populer/1');

    const data = await res.json();
    console.log("1 DATA");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getTopratedMovies() {
  try {
    const res = await fetch('/api/tv/top_rated/1');

    const data = await res.json();
    console.log("1 DATA");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getOnTheAirTvShows() {
  try {
    const res = await fetch('/api/tv/on_the_air/1');

    const data = await res.json();
    console.log("1 DATA");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
const Tv = () => {
  const [tvShows, setTvShows] = useState([]);

  async function clickHandler(e, getTvShows) {
    const parent = Array.from(e.target.parentElement.children);

    parent.forEach((ele) => {
      ele.classList.remove("bg-black");
      ele.classList.remove("text-white");
    });
    e.target.classList.add("bg-black");
    e.target.classList.add("text-white");

    // console.log("Link clicked", e.target.innerText);

    const tv = await getTvShows();
    setTvShows(tv);
  }

  useEffect(() => {
    const getTvShows = async () => {
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/tv/airing_today?language=en-US&page=1&api_key=${TMDB_API_KEY}&region=IN`
        );

        const data = await res.json();
        // console.log("1 DATA");
        setTvShows(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTvShows();
  }, []);

  return (
    <>
      <section className="mt-5 ml-5 text-xs md:text-lg">
        <div className="flex gap-3 border border-black w-fit rounded-full">
          <button
            className="bg-black rounded-full py-1 px-2 text-white"
            onClick={(e) => clickHandler(e, getAiringTodayTvShows)}
          >
            Airing Today
          </button>
          <button
            className="rounded-full py-1 px-2"
            onClick={(e) => clickHandler(e, getPopulerTvShows)}
          >
            Populer
          </button>
          <button
            className="rounded-full py-1 px-2"
            onClick={(e) => clickHandler(e, getOnTheAirTvShows)}
          >
            On The Air
          </button>
          <button
            className="rounded-full py-1 px-2"
            onClick={(e) => clickHandler(e, getTopratedMovies)}
          >
            Top Rated
          </button>
        </div>
      </section>
      <section className="flex flex-row overflow-x-auto gap-x-5 p-5">
        {tvShows.map((tv) => (
          <Link href={`/video-tv/${tv.id}`} key={tv.id}>
            <Card {...tv} key={tv.id} />
          </Link>
        ))}
      </section>
    </>
  );
};

export default Tv;
