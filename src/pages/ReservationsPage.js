import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { projectFirestore } from "../firebase/config";
import { getUID } from "../util/auth";
import MyReservations from "../components/MyReservations";

function ReservationsPage() {
  const { object } = useRouteLoaderData("my-reservations");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={object}>
          {(loadedObject) => <MyReservations object={loadedObject} />}
        </Await>
      </Suspense>
    </>
  );
}

export default ReservationsPage;

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
