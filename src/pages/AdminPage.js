import { Await, useLoaderData } from "react-router-dom";
import AdminMoviesList from "../components/AdminMoviesList";
import { Suspense } from "react";

function AdminPage() {
  const { movies } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={movies}>
        {(loadedMovies) => <AdminMoviesList movies={loadedMovies} />}
      </Await>
    </Suspense>
  );
}

export default AdminPage;
