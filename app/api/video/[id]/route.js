import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log('PARAMS', params)
  console.log(`${process.env.TMDB_BASE_URL}/movie/${params.id}/videos?language=en-US&api_key=${process.env.TMDB_API_KEY}`)
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/${params.id}/videos?language=en-US&api_key=${process.env.TMDB_API_KEY}`
  );


  const data = await res.json();
  let movie = data.results.filter(
    (each) =>
      each.name.includes("Official") &&
      each.type == "Trailer" &&
      each.official == true
  );

  function findAnotherVideo() {
    if (movie[0]) {
      // console.log("foundKey", movie[0].key)
      return movie[0].key;
    } else {
      // console.log("Another Key", data.results[0].key)
      return data.results[0].key;
    }
  }

  return NextResponse.json({ id: findAnotherVideo() });
}
