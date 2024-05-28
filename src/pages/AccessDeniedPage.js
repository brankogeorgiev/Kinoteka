import { Await } from "react-router-dom";
import { Suspense } from "react";
import AccessDenied from "../components/AccessDenied";

function AccessDeniedPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await>{() => <AccessDenied />}</Await>
    </Suspense>
  );
}

export default AccessDeniedPage;
