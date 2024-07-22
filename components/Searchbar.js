"use client";

import { useEffect, useState } from "react";
import SearchCard from "./SearchCard";

let controller;

const Searchbar = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("multi")

  useEffect(() => {
    // console.log("client query", query)

    const getSearchResult = async () => {
      if (controller) {
        controller.abort();
        console.log("Request Aborted");
      }
      controller = new AbortController();
      let signal = controller.signal;

      // console.log("Client query", query);

      const res = await fetch(`/api/search?query=${query}&filter=${filter.toLowerCase()}`, { signal });
      const data = await res.json();
      // console.log("RESULTS", data.results);

      setResults(data.results);
    };
    if (query.length > 1) {
      getSearchResult();
    }
  }, [query, filter]);

  return (
    <>
      <div className="flex h-40 md:h-80 bg-[url('/images/search-banner.jpeg')] justify-center">
        <form action="" className="self-center relative">
          <input
            type="h-20 content-center text border border-green-500"
            placeholder="Are you looking for entertainment?"
            className="w-[80vw] rounded-full h-10 p-2"
            value={query}
            onChange={(e) => {
              // console.log(e.target.value)
              setResults([]);
              setQuery(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-white border border-indigo-500 bg-gradient-to-tr from-violet-500 to-blue-500 p-2 rounded-full"
          >
            Serach
          </button>
          <select className="absolute right-20 top-3" name="" id="" onChange={(e) => setFilter(e.target.value)}>
            <option value="multi">All</option>
            <option value="tv">TV</option>
            <option value="movie">Movies</option>
          </select>
          {results.length >= 1 && (
            <section className="absolute backdrop-blur-lg text-white p-2 rounded-md z-10 max-h-96 overflow-y-auto">
              <ul>
                {results.map((val) => (
                  <SearchCard key={val.id} {...val} filter={filter}/>
                ))}
              </ul>
            </section>
          )}
        </form>
      </div>
    </>
  );
};

export default Searchbar;
