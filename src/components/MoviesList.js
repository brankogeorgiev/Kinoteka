import { Link } from "react-router-dom";
import classes from "./MoviesList.module.css";
import { IoTicket } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

function MoviesList({ movies }) {
  const [shownMovies, setShownMovies] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetchHalls();
    setShownMovies(movies);
  }, [movies]);

  useEffect(() => {
    console.log(halls);
  }, [halls]);

  async function fetchHalls() {
    let hallsFetched = [];
    await projectFirestore
      .collection("halls")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            hallsFetched.push({ id: doc.id, ...doc.data() });
          });
        }
      });
    setHalls(hallsFetched);
  }

  function sortMoviesByTitle(ascending) {
    const sortedMovies = [...shownMovies];
    if (ascending) {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
    }
    setShownMovies(sortedMovies);
  }

  // TODO, incorrect sorting
  function sortMoviesByReleaseDate(ascending) {
    const sortedMovies = [...shownMovies];
    if (ascending) {
      sortedMovies.sort(
        (a, b) => a.releaseDate.seconds - b.releaseDate.seconds
      );
    } else {
      sortedMovies.sort(
        (a, b) => b.releaseDate.seconds - a.releaseDate.seconds
      );
    }
    setShownMovies(sortedMovies);
  }

  function sortMoviesByDuration(ascending) {
    const sortedMovies = [...shownMovies];
    if (ascending) {
      sortedMovies.sort((a, b) => a.durationTime - b.durationTime);
    } else {
      sortedMovies.sort((a, b) => b.durationTime - a.durationTime);
    }
    setShownMovies(sortedMovies);
  }

  return (
    <div className={classes.movies_list}>
      <div className={classes.movies_list_inner}>
        <h1 style={{ display: "inline-block" }}>All movies</h1>
        <div
          style={{
            display: "inline-block",
            marginLeft: "30rem",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortMoviesByTitle(true)}>
                A - Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortMoviesByTitle(false)}>
                Z - A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortMoviesByReleaseDate(true)}>
                Oldest to Latest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortMoviesByReleaseDate(false)}>
                Latest to Oldest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortMoviesByDuration(true)}>
                Shortest to Longest
              </Dropdown.Item>
              <Dropdown.Item onClick={() => sortMoviesByDuration(false)}>
                Longest to Shortest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <ul>
          {shownMovies.map((movie) => {
            const now = new Date();
            const nowTime = now.getTime();
            const movieProjections = movie.projections
              .filter(
                (proj) =>
                  proj.time.seconds * 1000 + proj.time.nanoseconds / 1000000 >=
                  nowTime
              )
              .sort(
                (a, b) =>
                  a.time.seconds * 1000 +
                  a.time.nanoseconds / 1000000 -
                  (b.time.seconds * 1000 + b.time.nanoseconds / 1000000)
              )
              .splice(0, 3);

            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <img src={movie.poster} alt={movie.description} />
                </Link>
                <div className={classes.movie_informations}>
                  <div className={classes.movie_label}>
                    <Link to={`/movies/${movie.id}`}>
                      <h2>{movie.title}</h2>
                    </Link>
                  </div>
                  <div className={classes.movie_label}>
                    <div>
                      {movie.genre.join(", ")} | {movie.durationTime} min
                    </div>
                  </div>
                </div>
                <div className={classes.times}>
                  {movieProjections.length !== 0 &&
                    movieProjections.map((proj) => {
                      console.log(movie);
                      const now = new Date();
                      const nowDate = now.toLocaleDateString();
                      const newProjDate = proj.time.toDate();
                      const projDate = newProjDate.toLocaleDateString();
                      const projTime = newProjDate.toLocaleTimeString();

                      const day = nowDate === projDate ? "Today" : projDate;
                      const time = projTime.split(":").splice(0, 2).join(":");

                      const hall = halls.find((tmp) => tmp.id === proj.hall);

                      let date = new Date(
                        proj.time.seconds * 1000 +
                          proj.time.nanoseconds / 1000000
                      );
                      date.setHours(date.getHours() + 2);
                      date = encodeURIComponent(date.toISOString());
                      date = date.split(".")[0] + "%2B02%3A00";

                      return (
                        <Link
                          to={`/movies/${movie.id}/${proj.hall}/${proj.id}`}
                        >
                          <div key={crypto.randomUUID()}>
                            <div className={classes.showtime}>
                              <div>
                                <span>{time}</span>{" "}
                                <IoTicket style={{ color: "lightgreen" }} />
                              </div>
                              <div>{day}</div>
                            </div>
                            <div className={classes.showtime}>
                              {hall && hall.name}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MoviesList;
