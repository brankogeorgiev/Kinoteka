import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import AddNewMovie from "../components/AddNewMovie";

function MovieEditPage() {
  const { movie } = useRouteLoaderData("edit-movie");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={movie}>
          {(loadedMovie) => (
            <AddNewMovie movieIsEdited={true} movie={loadedMovie} />
          )}
        </Await>
      </Suspense>
    </>
  );
}
export default MovieEditPage;
