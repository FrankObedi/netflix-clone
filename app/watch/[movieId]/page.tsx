"use client";
import React from "react";
import useMovie from "@/hooks/useMovei";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Watch = ({
  params: { movieId },
}: {
  params: {
    movieId: string;
  };
}) => {
  console.log("MovieId:", movieId);

  const { data } = useMovie(movieId as string);
  console.log("Title", data?.title);

  return (
    <div>
      <p className="text-white">{data?.title}</p>
    </div>
  );
};

export default Watch;
