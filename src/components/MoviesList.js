import { Link } from "react-router-dom";
import classes from "./MoviesList.module.css";
import { IoTicket } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";

function MoviesList({ movies }) {
  const [shownMovies, setShownMovies] = useState([]);

  useEffect(() => {
    setShownMovies(movies);
  }, [movies]);

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
          {shownMovies.map((movie) => (
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
                <div>
                  <div className={classes.showtime}>
                    <span>16:00</span>{" "}
                    <IoTicket style={{ color: "lightgreen" }} />
                  </div>
                  <div className={classes.showtime}>Hall 5</div>
                </div>
                <div></div>
                <div></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MoviesList;
