import { Link } from "react-router-dom";
import classes from "./MoviesList.module.css";
import { IoTicket } from "react-icons/io5";

function MoviesList({ movies }) {
  return (
    <div className={classes.movies_list}>
      <div className={classes.movies_list_inner}>
        <h1>All movies</h1>
        <ul>
          {movies.map((movie) => (
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
