import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import TopBanner from "../components/TopBanner";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";
import Footer from "./Footer";

function RootLayout() {
  // const { token } = useLoaderData();
  // const submit = useSubmit();

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }

  //   if (isTokenExpired === "EXPIRED") {
  //     submit(null, { action: "/logout", method: "post" });
  //     return;
  //   }

  //   const tokenDuration = getTokenDuration();
  //   console.log(tokenDuration);

  //   setTimeout(() => {
  //     submit(null, { action: "/logout", method: "post" });
  //   }, tokenDuration);
  // }, [token, submit]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBanner />
      <MainNavigation />
      <main className="d-flex flex-column flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
