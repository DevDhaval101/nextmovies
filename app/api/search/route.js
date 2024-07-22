import { NextResponse } from "next/server";


export async function GET(req) {

  const {searchParams} = new URL(req.url)

  const query = searchParams.get('query')
  const filter = searchParams.get('filter')

  // console.log('Server Query:', query)
  // console.log('Server Filter:', filter)


  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/search/${filter}?query=${query}&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await res.json();
    // console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    console.log(error.message);
  }
}
