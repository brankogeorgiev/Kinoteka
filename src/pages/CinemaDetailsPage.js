import { Await } from "react-router-dom";
import CinemaDetails from "../components/CinemaDetails";
import { Suspense } from "react";
import { tailChase } from "ldrs";

function CinemaDetailsPage() {
  tailChase.register();

  return (
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
      <Await>{() => <CinemaDetails />}</Await>
    </Suspense>
  );
}

export default CinemaDetailsPage;
