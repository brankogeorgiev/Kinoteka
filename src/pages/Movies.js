import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import MoviesList from "../components/MoviesList";
import { projectFirestore } from "../firebase/config";

function MoviesPage() {
  const { movies } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={movies}>
        {(loadedMovies) => <MoviesList movies={loadedMovies} />}
      </Await>
    </Suspense>
  );
}

export default MoviesPage;

export async function loadMoviesFirebase() {
  let results = [];
  await projectFirestore
    .collection("movies")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
      }
    });
  return results;
}

export function loader() {
  return defer({
    movies: loadMoviesFirebase(),
  });
}

// export async function loadMovies() {
//   return movies;
// }
//
// const movies = [
//   {
//     id: 1,
//     title: "Madame Web",
//     url: "https://lh3.googleusercontent.com/proxy/0zqRTMqdNU2aA2zdo7PPYNUT4C9k0zMpcuHxQ8dvYpYif2QPTlUsp-VU_Or_SPqP0y6v6MhB7_EjntbOqi0q5oWb68RR688",
//     author: "Author 1",
//     durationTime: 120,
//     actors: ["Actor 1", "Actor 2"],
//     description: "Lorem ipsum description 1",
//     trailer: "https://www.youtube.com/embed/s_76M4c4LTo?si=wPufJyMZm1_-2710",
//     genre: "Action",
//   },
//   {
//     id: 2,
//     title: "Beekeeper",
//     url: "https://m.media-amazon.com/images/M/MV5BZjQwYjU3OTYtMWVhMi00N2Y2LWEzMDgtMzViN2U4NWI1NmI3XkEyXkFqcGdeQXVyODk2NDQ3MTA@._V1_FMjpg_UX1000_.jpg",
//     author: "Author 2",
//     durationTime: 120,
//     actors: ["Actor 3", "Actor 4"],
//     description: "Lorem ipsum description 2",
//     trailer: "https://www.youtube.com/embed/SzINZZ6iqxY?si=B6v-ezYROYld-1uF",
//     genre: "Action",
//   },
//   {
//     id: 3,
//     title: "Jaws",
//     url: "https://artloversaustralia.com.au/wp-content/uploads/2022/02/Sue-Dowse_Jaws-Movie-Poster_Primary-scaled.jpg",
//     author: "Author 3",
//     durationTime: 120,
//     actors: ["Actor 5", "Actor 6"],
//     description: "Lorem ipsum description 3",
//     trailer: "https://www.youtube.com/embed/U1fu_sA7XhE?si=ku41cjPoXykZO7Mf",
//     genre: "Horror",
//   },
// ];
