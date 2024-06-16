import { NextResponse } from "next/server";


export async function GET(req, {params}) {

  const pageNum = params.id
  // console.log('pageNum', pageNum)

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=${pageNum}&api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await res.json();
    // console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.log(error.message);
  }
}
