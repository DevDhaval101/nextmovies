'use client'

import Image from "next/image";
import { useState } from "react";

const img_baseURL = `https://image.tmdb.org/t/p/w500`;

const fallbackImageSrc = "/images/image.png"; // Define the fallback image source


const SeasonsCard = ({
  air_date,
  episode_count,
  name,
  overview,
  poster_path,
  seasons_number,
  vote_average,
}) => {
  const [imageError, setImageError] = useState(false)
 
  const imageErrorHandler = () => {
    setImageError(true)
  }

  return (
    <div className="mb-2 text-justify md:flex md:w-[50%] md:shrink-0 md:border rounded-md ">
      <Image
        src={imageError ? fallbackImageSrc :`${img_baseURL}${poster_path}`}
        height={112}
        width={75}
        alt={`${name} poster`}
        className="rounded-md w-fit h-fit md:h-[225] md:w-[150] float-left pr-2 md:float-none md:pr-0"
        onError={imageErrorHandler}
      ></Image>
      <div className="mx-2">
        <p className="text-xl font-bold">{name}</p>
        <p>
          <span className="bg-black text-white text-sm w-fit px-2 py-.5 rounded-md mr-2">
            &#9733;{vote_average}
          </span>
          {air_date && `${air_date.split("-")[0]} - ${episode_count} Episodes`}
        </p>
        <div className="mt-4">
            <p className="text-xl font-bold">Overview</p>
            <p>{overview}</p>
        </div>
      </div>
      <hr className="border md:border-none"/>
    </div>
  );
};

export default SeasonsCard;
