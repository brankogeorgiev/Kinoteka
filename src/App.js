import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/Root";
import AuthenticationPage from "./pages/Authentication";
import MoviesRootLayout from "./pages/MoviesRoot";
import MoviesPage from "./pages/Movies";
import { loader as moviesLoader } from "./pages/Movies";
import HallPage, { loader as hallInfoLoader } from "./pages/HallPage.js";
import HallsPage, { loader as hallsInfoLoader } from "./pages/HallsPage.js";
import MovieDetailPage, {
  loader as movieDetailLoader,
} from "./pages/MovieDetail";
import AdminPage from "./pages/AdminPage.js";
import AddNewMovie from "./components/AddNewMovie.js";
import MovieEditPage from "./pages/MovieEdit.js";
import MovieProjectionPage, {
  loader as movieProjectionLoader,
} from "./pages/MovieProjectionPage.js";
import AddMovieProjection, {
  loader as movieProjectionsLoader,
} from "./pages/AddMovieProjections.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      { index: true, element: <HomePage />, loader: moviesLoader },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
      {
        path: "movies",
        element: <MoviesRootLayout />,
        id: "movies",
        children: [
          {
            index: true,
            element: <MoviesPage />,
            loader: moviesLoader,
          },
          {
            path: ":movieId",
            children: [
              {
                index: true,
                id: "movie-detail",
                loader: movieDetailLoader,
                element: <MovieDetailPage />,
              },
              {
                path: ":hallId/:timestamp",
                id: "movie-projection",
                element: <MovieProjectionPage />,
                loader: movieProjectionLoader,
              },
            ],
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "movies",
            children: [
              { index: true, element: <AdminPage />, loader: moviesLoader },
              {
                path: "add-movie",
                element: <AddNewMovie />,
              },
              {
                path: "edit/:movieId",
                id: "edit-movie",
                loader: movieDetailLoader,
                children: [{ index: true, element: <MovieEditPage /> }],
              },
            ],
          },
          {
            path: "add-movie-projection",
            id: "add-movie-projection",
            element: <AddMovieProjection />,
            loader: movieProjectionsLoader,
          },
        ],
      },
      {
        path: "halls",
        children: [
          {
            index: true,
            element: <HallsPage />,
            loader: hallsInfoLoader,
          },
          {
            path: ":hallId",
            id: "hall-info",
            loader: hallInfoLoader,
            children: [
              {
                index: true,
                element: <HallPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
