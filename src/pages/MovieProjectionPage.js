import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import MovieProjection from "../components/MovieProjection";
import { tailChase } from "ldrs";

function MovieProjectionPage() {
  const { movieProjection } = useRouteLoaderData("movie-projection");
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
        <Await resolve={movieProjection}>
          {(loadedMovie) => <MovieProjection movieProjection={loadedMovie} />}
        </Await>
      </Suspense>
    </>
  );
}

export default MovieProjectionPage;

export async function loadMovieProjectionFirebase(id, projectionId, movieId) {
  let movieProjection = null;
  // let timePieces = time.split(/-|T|\+/);
  // const formattedTime = `${timePieces[2]}/${timePieces[1]}/${timePieces[0]}, ${timePieces[3]}`;

  // console.log(formattedTime);
  // timePieces[2] = timePieces[2].split("T");
  // timePieces = timePieces.flat();
  // timePieces[3] = timePieces[3].split("+")[0];

  // const formattedTime =
  //   timePieces[2] +
  //   "/" +
  //   timePieces[1] +
  //   "/" +
  //   timePieces[0] +
  //   ", " +
  //   timePieces[3];

  await projectFirestore
    .collection("hallOccupacy")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists && Array.isArray(doc.data().projections)) {
        movieProjection = doc
          .data()
          .projections.find(
            (mp) => mp.id === projectionId && mp.movie === movieId
          );
      } else {
        console.log("Could not find that hall");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return movieProjection;
}

export async function loader({ params }) {
  const { hallId, projectionId, movieId } = params;

  return defer({
    movieProjection: loadMovieProjectionFirebase(hallId, projectionId, movieId),
  });
}
