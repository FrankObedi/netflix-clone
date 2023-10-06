import { without } from "lodash";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

const handler = async (req: Request, res: Response) => {
  try {
    const { currentUser } = await serverAuth();

    const { movieId } = await req.json();

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    if (req.method === "POST") {
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return Response.json(user, { status: 200 });
    }

    if (req.method === "DELETE") {
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return Response.json(updatedUser, { status: 200 });
    }

    return Response.json({ error: "bad request" }, { status: 405 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 400 });
  }
};

export { handler as POST, handler as DELETE };
