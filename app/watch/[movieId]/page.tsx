"use client";
import React from "react";
import useMovie from "@/hooks/useMovei";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = ({
  params: { movieId },
}: {
  params: {
    movieId: string;
  };
}) => {
  console.log("MovieId:", movieId);
  const router = useRouter();
  const { data } = useMovie(movieId as string);
  console.log("Title", data?.title);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black
          bg-opacity-70
          text-white
        "
      >
        <button>
          <AiOutlineArrowLeft size={30} onClick={() => router.push("/")} />
        </button>
        <p className="text-white text-1xl lg:text-3xl font-semibold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        controls
        autoPlay
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
