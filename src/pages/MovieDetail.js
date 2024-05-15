import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { projectFirestore } from "../firebase/config";
import MovieDetails from "../components/MovieDetails";

function MovieDetailPage() {
  const { movie } = useRouteLoaderData("movie-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={movie}>
          {(loadedMovie) => <MovieDetails movie={loadedMovie} />}
        </Await>
      </Suspense>
    </>
  );
}

export default MovieDetailPage;

// async function loadMovie(id) {
//   const movies = await loadMoviesFirebase();

//   const movie = movies.find((m) => m.id === id);
//   console.log(movie);
//   return movie;
// }

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
