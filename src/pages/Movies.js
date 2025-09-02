import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import MoviesList from "../components/MoviesList";
import { projectFirestore } from "../firebase/config";
import { tailChase } from "ldrs";

function MoviesPage() {
  const { movies } = useLoaderData();
  tailChase.register();

  return (
    <Suspense
      fallback={
        <p
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
      {" "}
      <Await resolve={movies}>
        {(loadedMovies) => <MoviesList movies={loadedMovies} />}
      </Await>
    </Suspense>
  );
}

export default MoviesPage;

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
