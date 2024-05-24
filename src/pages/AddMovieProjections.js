import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import AddMovieProjection from "../components/AddMovieProjection";

function AddMovieProjectionPage() {
  const { movieProjections } = useRouteLoaderData("add-movie-projection");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={movieProjections}>
          {(loadedMovies) => <AddMovieProjection data={loadedMovies} />}
        </Await>
      </Suspense>
    </>
  );
}

export default AddMovieProjectionPage;

export async function loadMovieProjectionsFirebase() {
  let data = {};

  try {
    const moviesSnapshot = await projectFirestore.collection("movies").get();
    const movies = moviesSnapshot.docs.map((element) => ({
      id: element.id,
      ...element.data(),
    }));

    const hallsSnapshot = await projectFirestore.collection("halls").get();
    const halls = hallsSnapshot.docs.map((element) => ({
      id: element.id,
      ...element.data(),
    }));

    const hallOccupacySnapshot = await projectFirestore
      .collection("hallOccupacy")
      .get();
    const hallOccupacy = hallOccupacySnapshot.docs.map((el) => ({
      id: el.id,
      ...el.data(),
    }));

    data = {
      movies: movies,
      halls: halls,
      hallOccupacy: hallOccupacy,
    };

    return data;
  } catch (err) {
    console.log("Error fetching movies: ", err);
  }
}

export async function loader() {
  return defer({
    movieProjections: loadMovieProjectionsFirebase(),
  });
}
