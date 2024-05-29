import { Await, defer, useLoaderData } from "react-router-dom";
import MainContent from "./MainContent";
import { Suspense } from "react";
import { projectFirestore } from "../firebase/config";
import { tailChase } from "ldrs";

function HomePage() {
  const { movies } = useLoaderData();
  tailChase.register();

  return (
    <>
      <div
        className="flex-grow-1"
        style={{
          backgroundColor: "var(--color-secondary)",
          padding: "0 0 2.5rem 0",
        }}
      >
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
