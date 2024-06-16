import { NextResponse } from "next/server";


export async function GET(req, {params}) {

  const pageNum = params.pageNum

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=${pageNum}&api_key=${process.env.TMDB_API_KEY}&region=IN`
    );

    const data = await res.json();
    // console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.log(error.message);
  }
}
