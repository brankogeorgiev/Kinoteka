import {
  Await,
  defer,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { Suspense } from "react";
import { projectFirestore } from "../firebase/config";
import { getUID, tokenLoader } from "../util/auth";
import ProfileFavoriteMovies from "../components/ProfileFavoriteMovies";

function ProfileFavoriteMoviesPage() {
  const { object } = useRouteLoaderData("favorite-movies");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={object}>
          {(loadedObject) => <ProfileFavoriteMovies object={loadedObject} />}
        </Await>
      </Suspense>
    </>
  );
}

export default ProfileFavoriteMoviesPage;

export async function loadMoviesAndUserFirebase(uid) {
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

  let userFromDb;
  await projectFirestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userFromDb = doc.data();
        userFromDb.id = uid;
      }
    });

  let object = { movies: results, user: userFromDb };
  return object;
}

export async function loader() {
  const uid = getUID();

  return defer({
    object: loadMoviesAndUserFirebase(uid),
  });
}
