import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import classes from "./MoviesList.module.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function ComingSoon({ movies }) {
  const [shownMovies, setShownMovies] = useState([]);

  useEffect(() => {
    const now = new Date();
    fetchHalls();
    setShownMovies(
      movies.filter((mov) => mov.releaseDate.toDate().getTime() > now.getTime())
    );
  }, [movies]);

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
    <div className={classes.movies_list + " flex-grow-1"}>
      <div className={classes.movies_list_inner}>
        <div className="d-flex justify-content-between">
          <h1 className="px-5" style={{ display: "inline-block" }}>
            Coming Soon
          </h1>
          <div className={classes.sorter}>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className={classes.sortByText}
              >
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
        </div>

        <ul>
          {shownMovies.map((movie) => {
            const date = movie.releaseDate
              .toDate()
              .toLocaleDateString()
              .split("/");
            const day = date[0];
            const month = date[1];
            const year = date[2];
            let monthFullName = "";
            if (month === "01") {
              monthFullName = "January";
            } else if (month === "02") {
              monthFullName = "February";
            } else if (month === "03") {
              monthFullName = "March";
            } else if (month === "04") {
              monthFullName = "April";
            } else if (month === "05") {
              monthFullName = "May";
            } else if (month === "06") {
              monthFullName = "June";
            } else if (month === "07") {
              monthFullName = "July";
            } else if (month === "08") {
              monthFullName = "August";
            } else if (month === "09") {
              monthFullName = "September";
            } else if (month === "10") {
              monthFullName = "October";
            } else if (month === "11") {
              monthFullName = "November";
            } else monthFullName = "December";

            const fullDate = `${day} ${monthFullName} ${year}`;

            return (
              <li key={movie.id} className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={movie.poster}
                      alt={movie.description}
                      className={classes.posterImg}
                    />
                  </Link>
                  <div className={classes.movie_informations}>
                    <div className={classes.movie_label}>
                      <Link to={`/movies/${movie.id}`}>
                        <h2>{movie.title}</h2>
                      </Link>
                    </div>
                    <div className={classes.movie_label}>
                      <div>
                        <p>
                          {movie.genre.join(", ")} | {movie.durationTime} min
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    classes.premiereText +
                    " text-white my-auto text-right fw-bold"
                  }
                >
                  Premiere: {fullDate}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ComingSoon;
