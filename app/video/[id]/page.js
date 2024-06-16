import Image from "next/image";
import CelebCard from "@/components/CelebCard";
import VideoPlayer from "@/components/videoplayer.jsx";

const img_baseURLBanner = `https://image.tmdb.org/t/p/w1280`;
const img_baseURLPoster = `https://image.tmdb.org/t/p/w500`;

async function getYoutubeVideoID(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/video/${id}`);
    const data = await res.json();
    // console.log("youtTube id recived", data.id);
    return data.id;
  } catch (error) {
    console.log(error);
  }
}

async function checkVidoExist(id) {
  try {
    // check video exist on server or not
    const res = await fetch(`http://localhost:3000/api/isVideo/${id}`);
    const data = await res.json();
    const isVideo = data.success;
    console.log("DO video EXIST", isVideo);
    return isVideo;
  } catch (error) {
    console.log(error);
  }
}

async function checkURI(id) {
  try {
    // check video exist on server or not
    const res = await fetch(
      `https://dexter-stream.in-maa-1.linodeobjects.com/hls-stream/${id}/master.m3u8`
    );
    if (!res.ok) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getDetails(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/detail/${id}`, {
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
  const isVideo = await checkURI(params.id);
  const detail = await getDetails(params.id);

  // const url = `${img_baseURLBanner}${detail.backdrop_path}`
  // console.log("URL",detail.credits.cast.length)

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
            <p className="text-xl">{detail.original_title}</p>
            <p className="text-xs">
              {detail.vote_average} ({detail.vote_count} voted) -{" "}
              <span>{detail.release_date.split("-")[0]}</span>
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
            {<p>{detail.genres.map((genres) => genres.name).join(", ")}</p>}
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

      <div className="mb-2">
        <p className="text-2xl text-white p-2 text-center bg-gradient-to-r from-red-500 via-[#ff69b4]-500 via-purple-500 to-blue-500 ">
          Watch Trailer
        </p>
      </div>

      <iframe
        className="mx-auto w-screen"
        width={640}
        height={480}
        src={`https://www.youtube.com/embed/${youtubeVideoID}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="mt-2">
        <p className="text-2xl text-white p-2 text-center bg-gradient-to-r from-red-500 via-[#ff69b4]-500 via-purple-500 to-blue-500 ">
          Watch Movie
        </p>
      </div>

      {isVideo ? (
        <VideoPlayer src={`https://dexter-stream.in-maa-1.linodeobjects.com/hls-stream/${params.id}/master.m3u8`} />
        
      ) : (
        <div className="flex justify-center items-center h-20">
          <p className="md:text-xl">Not available</p>
        </div>
      )}
    </>
  );
};

export default Video;
