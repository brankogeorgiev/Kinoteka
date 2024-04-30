import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import TopBanner from "../components/TopBanner";

function RootLayout() {
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
