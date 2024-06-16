import { NextResponse } from "next/server";

// export async function GET(Request){
//   console.log(Request.url.pathname.split('/').at(-1))
//   return new Response("GET /api/movies/[pageNum]")
// }

export async function GET(req, {params}) {

  const pageNum = params.pageNum

  // const {searchParams} = new URL(req.url)

  // console.log('pageNum', searchParams)

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=${pageNum}&api_key=${process.env.TMDB_API_KEY}&region=IN`
    );

    const data = await res.json();
    // console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.log(error.message);
  }
}
