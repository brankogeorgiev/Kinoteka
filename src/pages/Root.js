import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import TopBanner from "../components/TopBanner";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const { token } = useLoaderData();
  const submit = useSubmit();

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
    <>
      <TopBanner />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
