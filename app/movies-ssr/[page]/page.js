import Card from "@/components/Card";
import Link from "next/link";

async function getMovies(pageNum) {
  // console.log("PAGENUM", pageNum);
  try {
    const res = await fetch(`http://localhost:3000/api/movies/populer/${pageNum}`);

    const data = await res.json();
    // console.log("DATA", data)
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

const Movies = async ({ params }) => {
  // console.log("PARAMS", params);
  let movies = "";

  try {
    movies = await getMovies(params.page);
  } catch (error) {
    console.log(error);
  }
  return (
    <section>
      <div className="text-blue-600">Home</div>
      <select name="movies_filter" id="movies_filter">
        <option value="populer">Populer</option>
        <option value="trending">Latest</option>
        <option value="upcoming">Upcoming</option>
        <option value="toprated">Top Rated</option>
      </select>
      <hr></hr>
      <div className="flex flex-row overflow-x-auto gap-x-5 p-5">
        {movies &&
          movies.map((movie) => (
            <Link href={`/video/${movie.id}`} key={movie.id}>
              <Card {...movie} />
            </Link>
          ))}
      </div>
      <div className="flex justify-center space-x-2">
      <Link
          href={`/movies-ssr/${+params.page - 1}`}
          className="border-2 rounded-md border-indigo-500 p-2 hover:bg-indigo-500"
        >
          Prev Page {"<"} {+params.page - 1}
        </Link>
        <Link
          href={`/movies-ssr/${+params.page}`}
          className="border rounded-md border-indigo-500 p-2  bg-indigo-500"
        >
          {+params.page}
        </Link>
        <Link
          href={`/movies-ssr/${+params.page + 1}`}
          className="border-2 rounded-md border-indigo-500 p-2 hover:bg-indigo-500"
        >
          Next Page {">"} {+params.page + 1}
        </Link>
      </div>
    </section>
  );
};

export default Movies;
