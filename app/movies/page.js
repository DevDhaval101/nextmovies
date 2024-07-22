"use client";

import Navbar from '@/components/Navbar'
import Card from '@/components/Card'
import Link from 'next/link';
import { useEffect, useState } from "react";

const Test = () => {
  const [moviePageNum, setMoviePageNum] = useState(1);
  const [movies, setMovies] = useState([]);

  // Function to fetch movies based on page number
  const fetchMovies = async (page) => {
    try {
      const res = await fetch(`/api/movies/populer/${page}`);
      const data = await res.json();
      const results = data.results;
      return results;
    } catch (error) {
      console.error("Error loading movies:", error);
      return [];
    }
  };

  // Load movie data and pageNum from sessionStorage when the component mounts
  useEffect(() => {
    const storedMovies = JSON.parse(sessionStorage.getItem("movies"));
    const storedPageNum = JSON.parse(sessionStorage.getItem("moviePageNum"));

    if (storedMovies) {
      setMovies(storedMovies);
    }

    if (storedPageNum) {
      setMoviePageNum(storedPageNum);
    } else {
      // If no pageNum is in sessionStorage, load the first page of movies
      loadMovies(1);
    }
  }, []);

  // Save movie data and pageNum to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("movies", JSON.stringify(movies));
    sessionStorage.setItem("moviePageNum", JSON.stringify(moviePageNum));
  }, [movies, moviePageNum]);

  const loadMovies = async (page) => {
    const results = await fetchMovies(page);

    // Filter out duplicates based on movie ID
    const newMovies = results.filter((newMovie) => {
      return !movies.some((existingMovie) => existingMovie.id === newMovie.id);
    });

    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };

  const handleNextClick = () => {
    setMoviePageNum((prev) => prev + 1);
  };

  useEffect(() => {
    if (moviePageNum > 1) {
      loadMovies(moviePageNum);
    }
  }, [moviePageNum]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      sessionStorage.setItem("scrollY", window.scrollY);
    });
  }, []);

  useEffect(() => {
    // Restore scroll position when the component is mounted or re-rendered
    setTimeout(() => {
      window.scrollTo(0, sessionStorage.getItem("scrollY"));
      // console.log("scroll restored")
    }, 1000)
  }, []);

  // infinite scroll

  const handleInfiniteScroll = () => {
    // console.log("screen size", window.innerHeight)
    // console.log("scroll from top", document.documentElement.scrollTop)
    // console.log("document heighr", document.documentElement.scrollHeight)
    try {
      if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
        setMoviePageNum(pre => pre + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll)

    return () => window.removeEventListener('scroll', handleInfiniteScroll)
  }, [])

  return (
    <section>
      <Navbar />
      <div className="fixed top-0 z-10 bg-white">
        {/* <button
          className="border border-indigo-500 m-4 p-2 text-xl"
          onClick={handleNextClick}
        >
          Next
        </button> */}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {movies.map((movie) => (
          <Link href={`/video/${movie.id}`} key={movie.id}>
            <Card {...movie} key={movie.id} />
          </Link>
          
        ))}
      </div>
    </section>
  );
};

export default Test;

