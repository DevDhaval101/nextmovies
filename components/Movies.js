"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";

const TMDB_API_KEY = "af80426d7aa9331ce56cf89de748e5bd";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function getNowplayingMovies() {
  try {
    const res = await fetch('/api/movies/now_playing/1');
    const data = await res.json();
    // console.log("1 DATA", data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getPopulerMovies() {
  try {
    const res = await fetch('/api/movies/populer/1');

    const data = await res.json();
    // console.log("1 DATA");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getTopratedMovies() {
  try {
    const res = await fetch('/api/movies/top_rated/1');

    const data = await res.json();
    // console.log("1 DATA");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function getUpcomingMovies() {
  try {
    const res = await fetch('/api/movies/upcoming/1');

    const data = await res.json();
    // console.log("1 DATA");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
const Movies = () => {
  const [movies, setMovies] = useState([]);

  async function clickHandler(e, getMovies) {
    const parent = Array.from(e.target.parentElement.children);

    parent.forEach((ele) => {
      ele.classList.remove("bg-black");
      ele.classList.remove("text-white");
    });
    e.target.classList.add("bg-black");
    e.target.classList.add("text-white");

    console.log("Link clicked", e.target.innerText);

    const movies = await getMovies();
    setMovies(movies);
  }

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch(
          '/api/movies/now_playing/1'
        );

        const data = await res.json();
        // console.log("1 DATA");
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <section className="mt-5 ml-5 text-xs md:text-lg">
        <div className="flex gap-3 border border-black w-fit rounded-full">
          <button
            className="bg-black rounded-full py-1 px-2 text-white"
            onClick={(e) => clickHandler(e, getNowplayingMovies)}
          >
            Now Playing
          </button>
          <button
            className="rounded-full py-1 px-2"
            onClick={(e) => clickHandler(e, getPopulerMovies)}
          >
            Populer
          </button>
          <button
            className="rounded-full py-1 px-2"
            onClick={(e) => clickHandler(e, getTopratedMovies)}
          >
            Top rated
          </button>
          <button
            className="rounded-full py-1 px-2"
            onClick={(e) => clickHandler(e, getUpcomingMovies)}
          >
            Upcoming
          </button>
        </div>
      </section>
      <section className="flex flex-row overflow-x-auto gap-x-5 p-5">
        {movies.map((movie) => (
          <Link href={`/video/${movie.id}`} key={movie.id}>
            <Card {...movie} key={movie.id} />
          </Link>
        ))}
      </section>
    </>
  );
};

export default Movies;
