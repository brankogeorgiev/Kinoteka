import { Await } from "react-router-dom";
import { Suspense } from "react";
import MyProfile from "../components/MyProfile";
import { tailChase } from "ldrs";

function MyProfilePage() {
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
      <Await>{() => <MyProfile />}</Await>
    </Suspense>
  );
}

export default MyProfilePage;
