import { Suspense } from "react";
import Hall from "../components/Hall";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { tailChase } from "ldrs";

function HallPage() {
  const { hall } = useRouteLoaderData("hall-info");
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
        {" "}
        <Await resolve={hall}>
          {(loadedHall) => <Hall hall={loadedHall} />}
        </Await>
      </Suspense>
    </>
  );
}

export default HallPage;

export async function loadHallFirebase(id) {
  let hall;
  await projectFirestore
    .collection("halls")
    .doc(id)
    .get()
    .then((doc) => {
      console.log(doc.exists);
      if (doc.exists) {
        hall = doc.data();
      } else {
        console.log("Could not find that hall");
        hall = null;
      }
    });
  return hall;
}

export async function loader({ params }) {
  const id = params.hallId;

  return defer({
    hall: loadHallFirebase(id),
  });
}
