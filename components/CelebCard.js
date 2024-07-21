"use client";

import Image from "next/image";
import { useState } from "react";

const img_baseURLPoster = `https://image.tmdb.org/t/p/w500`;

const fallbackImageSrc = "/images/user.png"; // Define the fallback image source

const CelebCard = (props) => {
  const { name, character, profile_path } = props.data;

  const [imageError, setImageError] = useState(false); // Track image loading error

  const hadnleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="flex-shrink-0 w-[75px] md:w-[150px]">
      <Image
        src={
          imageError ? fallbackImageSrc : `${img_baseURLPoster}${profile_path}`
        }
        alt={name}
        width={150}
        height={225}
        className="rounded-md md:w-[150px] md:h-[225px] w-[75px] [h-125px]"
        onError={hadnleImageError}
      ></Image>
      <p className="font-bold text-xs md:text-base">{name}</p>
      <p className="truncate hover:overflow-visible hover:z-10 bg-blend-normal text-xs md:text-base">
        {character}
      </p>
    </div>
  );
};

export default CelebCard;
