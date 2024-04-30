import { Suspense } from "react";
import Halls from "../components/Halls";
import { projectFirestore } from "../firebase/config";
import { Await, defer, useLoaderData } from "react-router-dom";

function HallsPage() {
  let { halls } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={halls}>
          {(loadedHalls) => <Halls halls={loadedHalls} />}
        </Await>
      </Suspense>
    </>
  );
}

export default HallsPage;

export async function loadHallsFirebase() {
  let halls = [];
  await projectFirestore
    .collection("halls")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          halls.push({ id: doc.id, ...doc.data() });
        });
      }
    });
  // .then((doc) => {
  //   if (doc.exists) {
  //     halls.push(doc.data());
  //   } else {
  //     console.log("Could not find that hall");
  //     halls = [];
  //   }
  // });
  return halls;
}

export async function loader() {
  return defer({
    halls: loadHallsFirebase(),
  });
}
