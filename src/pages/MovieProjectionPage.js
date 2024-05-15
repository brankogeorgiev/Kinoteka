import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import MovieProjection from "../components/MovieProjection";

function MovieProjectionPage() {
  const { movieProjection } = useRouteLoaderData("movie-projection");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={movieProjection}>
          {(loadedMovie) => <MovieProjection movieProjection={loadedMovie} />}
        </Await>
      </Suspense>
    </>
  );
}

export default MovieProjectionPage;

export async function loadMovieProjectionFirebase(id, time, movieId) {
  let movieProjection;
  let timePieces = time.split("-");
  timePieces[2] = timePieces[2].split("T");
  timePieces = timePieces.flat();
  timePieces[3] = timePieces[3].split("+")[0];

  const formattedTime =
    timePieces[2] +
    "/" +
    timePieces[1] +
    "/" +
    timePieces[0] +
    ", " +
    timePieces[3];

  await projectFirestore
    .collection("hallOccupacy")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        movieProjection = doc
          .data()
          .projections.find(
            (mp) =>
              mp.time.toDate().toLocaleString() === formattedTime &&
              mp.movie === movieId
          );
      } else {
        console.log("Could not find that hall");
      }
    });
  return movieProjection;
}

export async function loader({ params }) {
  const id = params.hallId;
  const time = params.timestamp;
  const movieId = params.movieId;

  return defer({
    movieProjection: loadMovieProjectionFirebase(id, time, movieId),
  });
}
