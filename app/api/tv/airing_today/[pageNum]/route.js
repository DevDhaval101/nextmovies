export async function GET(req, { params }) {
  const pageNum = params.pageNum;

  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/tv/airing_today?language=en-US&page=${pageNum}&api_key=${process.env.TMDB_API_KEY}&region=IN`
    );

    const data = await res.json()

    return Response.json(data)
    
  } catch (error) {
    console.log(error);
  }
}
