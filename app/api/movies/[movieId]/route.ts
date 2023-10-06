import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { movieId: string };
  }
) {
  try {
    await serverAuth();

    const movieId = params.movieId;
    // console.log("BOOODY:", movieId);

    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Invalid Id");
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 400 });
  }
}
