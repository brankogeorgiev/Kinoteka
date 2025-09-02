import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import TopBanner from "../components/TopBanner";
import Footer from "./Footer";

function RootLayout() {
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
