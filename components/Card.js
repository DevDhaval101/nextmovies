'use client'

// import Image from "next/image";
// import { useEffect, useState } from "react";

// const Card = ({
//   vote_average,
//   poster_path,
//   title,
//   release_date,
//   name,
//   first_air_date,
// }) => {
//   // console.log("COMPONENT DATA", props.data.title)
//   const img_baseURL = "https://image.tmdb.org/t/p/w500";

//   return (
//     <div className="w-[150px] relative">
//       <p className="absolute right-0 px-1 flex bg-black/60 text-white rounded-tr-md flex-shrink-0 items-center">
//         <Image
//           src="/images/star.png"
//           width={15}
//           height={15}
//           alt="start rating"
//           className="m-1"
//         />
//         {vote_average}
//       </p>
//       <Image
//         className="rounded-md"
//         src={`${img_baseURL}${poster_path}`}
//         alt={`${title ? title : name} picture`}
//         width={150}
//         height={225}
//       />
//       <p className="line-clamp-1">{title ? title : name}</p>
//       <p>{release_date ? release_date : first_air_date}</p>
//     </div>
//   );
// };

// export default Card;

import Image from "next/image";
import { useEffect, useState } from "react";

const Card = ({
  vote_average,
  poster_path,
  title,
  release_date,
  name,
  first_air_date,
}) => {
  const img_baseURL = "https://image.tmdb.org/t/p/w500";
  const fallbackImageSrc = "/images/video-camera.png"; // Define the fallback image source

  const [imageError, setImageError] = useState(false); // Track image loading error

  // Function to handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="md:w-[150px] w-[75px] relative text-xs md:text-base">
      <p className="absolute right-0 px-1 flex bg-black/60 text-white rounded-tr-md flex-shrink-0 items-center">
        <Image
          src="/images/star.png"
          width={15}
          height={15}
          alt="start rating"
          className="m-1 md:w-[15px] w-[12px]"
        />
        {vote_average}
      </p>
      <Image
        className="rounded-md md:w-[150px] md:h-[225px] w-[75px] h-[115px]"
        src={imageError ? fallbackImageSrc : `${img_baseURL}${poster_path}`}
        alt={`${title ? title : name} picture`}
        width={150}
        height={225}
        onError={handleImageError} // Set up error handling
      />
      <p className="line-clamp-1">{title ? title : name}</p>
      <p>{release_date ? release_date : first_air_date}</p>
    </div>
  );
};

export default Card;

