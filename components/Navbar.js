"use client";

import Link from "next/link";

function navHandler(){
  const ele = document.getElementById('mobile-nav')
  ele.classList.toggle('hidden')
  ele.classList.toggle('flex')
}

const Navbar = () => {

  return (
    <>
      <header className="bg-gradient-to-r from-red-500 via-[#ff69b4]-500 via-purple-500 to-blue-500 p-3">
        <section className="flex justify-between self-center items-center">
          <Link href="/" className="text-3xl">
            Next Movies
          </Link>
          <button
            className="md:hidden text-2xl"
            onClick={navHandler}
          >
            &#9776;
          </button>
          <nav className="hidden md:block text-xl">
            <Link href="/movies" className="m-2 p-2">
              Movies
            </Link>
            <Link href="/tv" className="m-2 p-2">
              Tv Shows
            </Link>
          </nav>
        </section>
      </header>
      <section
        id="mobile-nav"
        className="absolute right-0 backdrop-blur-md hidden flex-col p-4 md:hidden text-white w-screen items-center text-xl z-20"
      >
        <Link href="/movies" className="m-2">
          Movies
        </Link>
        <Link href="/tv" className="m-2">
          TV Shows
        </Link>
      </section>
    </>
  );
};

export default Navbar;
