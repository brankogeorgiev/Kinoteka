import { Await, defer, useLoaderData } from "react-router-dom";
import MainContent from "./MainContent";
import { Suspense } from "react";
import { projectFirestore } from "../firebase/config";

function HomePage() {
  const { movies } = useLoaderData();

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--color-secondary)",
          padding: "0 0 2.5rem 0",
        }}
      >
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={movies}>
            {(loadedMovies) => <MainContent movies={loadedMovies} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

export default HomePage;

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
