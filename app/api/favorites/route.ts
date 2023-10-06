import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

const handler = async () => {
  try {
    const { currentUser } = await serverAuth();
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return Response.json(favoriteMovies, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 400 });
  }
};

export { handler as GET };
