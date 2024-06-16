'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";


const img_baseURL = "https://image.tmdb.org/t/p/w500";

const fallbackImageSrc = "/images/image.png"; // Define the fallback image source


const SearchCard = ({poster_path, profile_path, original_title, name, id, filter}) => {

  const [imageError, setImageError] = useState(false)

  const imageErrorHandler = () => {
    setImageError(true)
  }

  const setHref = () => {
    if(poster_path && original_title){
      return `/video/${id}`
    }else if(poster_path && name){
      return `/video-tv/${id}`
    }else {
      return `/person/${id}`
    }
  }

  // console.log('FILTER', filter)
  return (
    <Link href={setHref()} className="flex items-center">
        <Image
        height={150}
        width={75}
        alt={original_title ? original_title : name}
        src={imageError ? fallbackImageSrc : (poster_path ?`${img_baseURL}${poster_path}`: `${img_baseURL}${profile_path}`)}
        className="px-2"
        onError={imageErrorHandler}
        >
        </Image>
        <p>{original_title ? original_title : name}</p>
    </Link>
  )
}

export default SearchCard