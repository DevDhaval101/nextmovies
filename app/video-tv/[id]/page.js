import Image from "next/image";
import CelebCard from "@/components/CelebCard";
import SeasonsCard from "@/components/SeasonsCard";

const img_baseURLBanner = `https://image.tmdb.org/t/p/w1280`;
const img_baseURLPoster = `https://image.tmdb.org/t/p/w500`;

async function getYoutubeVideoID(id) {
  try {
    const res = await fetch(`http://localhost:3002/api/video-tv/${id}`);
    const data = await res.json();
    // console.log("youtTube id recived", data.id);
    return data.id;
  } catch (error) {
    console.log(error);
  }
}

// async function checkVidoExist(id) {
//   try {
//     // check video exist on server or not
//     const res = await fetch(`http://localhost:3002/api/isVideo/${id}`);
//     const data = await res.json();
//     const isVideo = data.success;
//     console.log("DO video EXIST", isVideo);
//     return isVideo;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function getDetails(id) {
  try {
    const res = await fetch(`http://localhost:3002/api/detail-tv/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

const Video = async ({ params }) => {
  // console.log("PARAMS", params.id)

  const youtubeVideoID = await getYoutubeVideoID(params.id);
  // const isVideo = await checkVidoExist(params.id);
  const detail = await getDetails(params.id);

  return (
    <>
      <section className="flex relative">
        <Image
          src={`${img_baseURLBanner}${detail.backdrop_path}`}
          height={500}
          width={500}
          className="w-full object-fit"
        ></Image>
        <div className="absolute text-white flex items-end left-2 bottom-2">
          <Image
            src={`${img_baseURLPoster}${detail.poster_path}`}
            height={122}
            width={75}
            className="rounded-md shadow-2xl md:w-[150px] md:h-[225px]"
          ></Image>
          <div className="px-2">
            <p className="text-xl">{detail.name}</p>
            <p className="text-xs">
              Seasons -{" "}
              {detail.seasons.filter((val) => val.season_number >= 1).length}
            </p>
            <p className="text-xs">
              {detail.vote_average} ({detail.vote_count} voted) -{" "}
              <span>{detail.first_air_date.split("-")[0]}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-300 p-3">
        <div>
          <div className="mt-2">
            <p className="font-bold text-xl">Overview:</p>
            <p>{detail.overview}</p>
          </div>
          <div>
            <p className="font-bold text-xl mt-2">Genres:</p>
            <p>{detail.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
          <div>
            <p className="font-bold text-xl mt-2">Production:</p>
            <p>
              {detail.production_companies.map((com) => com.name).join(", ")}
            </p>
          </div>
        </div>
      </section>

      <section className="m-2">
        <p className="text-2xl font-bold mb-2">Cast</p>
        <div className="flex gap-2 overflow-scroll">
          {detail.credits.cast
            .filter((val) => val.known_for_department === "Acting")
            .map((cast) => (
              <CelebCard data={cast} />
            ))}
        </div>
      </section>

      <section className="m-2">
        <p className="text-2xl font-bold mb-2">Seasons</p>
        <div className="flex flex-col shrink-0 md:flex-row md:overflow-scroll md:gap-2">
          {detail.seasons
            .reverse()
            .filter((val) => val.season_number >= 1)
            .map((season) => (
              <SeasonsCard {...season} />
            ))}
        </div>
      </section>

      <div className="mb-2">
        <p className="text-2xl text-white p-2 text-center bg-gradient-to-r from-red-500 via-[#ff69b4]-500 via-purple-500 to-blue-500 ">
          Watch Trailer
        </p>
      </div>

      <div className="relative pt-[56.25%] w-full">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeVideoID}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* <div className="mt-2">
        <p className="text-2xl text-white p-2 text-center bg-gradient-to-r from-red-500 via-[#ff69b4]-500 via-purple-500 to-blue-500 ">
          Watch Now
        </p>
      </div>

      {isVideo ? (
        <video controls controlsList="nodownload" className="mx-auto w-screen mt-2 outline-none">
          <source src={`/api/watch/${params.id}`} type="video/mp4" />
        </video>
      ) : (
        <div className="flex justify-center items-center h-20">
          <p className="md:text-xl">Not available</p>
        </div>
      )} */}
    </>
  );
};

export default Video;
