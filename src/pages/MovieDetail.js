import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { projectFirestore } from "../firebase/config";
import MovieDetails from "../components/MovieDetails";
import { tailChase } from "ldrs";

function MovieDetailPage() {
  const { movie } = useRouteLoaderData("movie-detail");
  tailChase.register();

  return (
    <div>
      <Suspense
        fallback={
          <p
            className="flex-grow-1"
            style={{
              textAlign: "center",
              marginTop: "15rem",
            }}
          >
            <l-tail-chase
              size="75"
              speed="2"
              color="var(--color-third)"
            ></l-tail-chase>
          </p>
        }
      >
        <Await resolve={movie}>
          {(loadedMovie) => <MovieDetails movie={loadedMovie} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default MovieDetailPage;

export async function loadMovieFirebase(id) {
  let movie;
  await projectFirestore
    .collection("movies")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        movie = doc.data();
        movie.id = doc.id;
      } else {
        console.log("Could not find that movie");
      }
    });
  return movie;
}

export async function loader({ params }) {
  const id = params.movieId;

  return defer({
    movie: loadMovieFirebase(id),
  });
}
