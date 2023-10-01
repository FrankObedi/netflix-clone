"use client";
import React from "react";
import { NextPageContext } from "next";
import { useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import useSwr from "swr";
import fetcher from "@/libs/fetcher";
import Logout from "@/components/Logout";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  if (status === "loading") {
    return <p className="text-2xl text-white">Loading...</p>;
  }

  // const { data: user, error } = useSwr("/api/current", fetcher);

  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix Clone</h1>
      <h3 className="text-white text-xl">
        Logged in as: {session?.user?.name}
      </h3>
      <button
        onClick={() => signOut()}
        className="w-1/2 h-10 text-white bg-red-400"
      >
        Logout
      </button>
    </>
  );
}
