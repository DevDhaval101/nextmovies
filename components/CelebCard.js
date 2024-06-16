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
    <div className="flex-shrink-0 w-[150px]">
      <Image
        src={
          imageError ? fallbackImageSrc : `${img_baseURLPoster}${profile_path}`
        }
        alt={name}
        width={150}
        height={225}
        className="rounded-md w-[150px] h-[225px]"
        onError={hadnleImageError}
      ></Image>
      <p className="font-bold">{name}</p>
      <p className="truncate hover:overflow-visible hover:z-10 bg-blend-normal">
        {character}
      </p>
    </div>
  );
};

export default CelebCard;
