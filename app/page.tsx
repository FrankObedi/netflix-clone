"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

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

  return (
    <>
      <Navbar />
    </>
  );
}
