import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import MovieSearch from "../components/MovieSearch";

function MovieSearchPage() {
  const { movies } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={movies}>
        {(loadedMovies) => <MovieSearch movies={loadedMovies} />}
      </Await>
    </Suspense>
  );
}

export default MovieSearchPage;

export async function loadMoviesFirebase() {
  let results = [];
  await projectFirestore
    .collection("movies")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
      }
    });
  return results;
}

export function loader() {
  return defer({
    movies: loadMoviesFirebase(),
  });
}
