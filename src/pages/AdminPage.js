import { Await, useLoaderData } from "react-router-dom";
import AdminMoviesList from "../components/AdminMoviesList";
import { Suspense } from "react";
import { tailChase } from "ldrs";

function AdminPage() {
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
        {(loadedMovies) => <AdminMoviesList movies={loadedMovies} />}
      </Await>
    </Suspense>
  );
}

export default AdminPage;
