"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMoveList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";

export default function Home() {
  const { data: movies = [] } = useMoveList();
  const { data: favorites = [] } = useFavorites();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  if (status === "loading") {
    return <p className="text-2xl text-white">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My Favorites" data={favorites} />
      </div>
    </>
  );
}
