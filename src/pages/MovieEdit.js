import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import AddNewMovie from "../components/AddNewMovie";
import { tailChase } from "ldrs";

function MovieEditPage() {
  const { movie } = useRouteLoaderData("edit-movie");
  tailChase.register();

  return (
    <>
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
