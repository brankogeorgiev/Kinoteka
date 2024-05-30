import { FaSearch } from "react-icons/fa";
import classes from "./MovieSearch.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MovieSearch({ movies }) {
  const [shownMovies, setShownMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setShownMovies(movies);
  }, [movies]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setShownMovies(movies);
    } else {
      const filteredMovies = shownMovies.filter((mov) => {
        return (
          mov.title.toLowerCase().includes(query) ||
          mov.description.toLowerCase().includes(query) ||
          mov.director.toLowerCase().includes(query)
        );
      });
      setShownMovies(filteredMovies);
    }
  };

  return (
    <div className={classes.search_container + " flex-grow-1"}>
      <h4 className="fw-bold px-5" style={{ color: "var(--color-primary)" }}>
        Search movies
      </h4>
      <div className={classes.input_field + " px-5"}>
        <FaSearch />
        <input
          type="text"
          placeholder="Type to search..."
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>
      <ul className="px-5 m-3">
        {shownMovies &&
          shownMovies.map((mov) => (
            <li key={mov.id}>
              <div className="row my-3">
                <div className="col-1">
                  <Link
                    to={`/movies/${mov.id}`}
                    className="text-decoration-none"
                  >
                    <img src={`${mov.poster}`} style={{ width: "100%" }} />
                  </Link>
                </div>
                <div className="col-11">
                  <div>
                    <Link
                      to={`/movies/${mov.id}`}
                      className="text-decoration-none fs-4"
                      style={{ color: "var(--color-third)" }}
                    >
                      {mov.title}
                    </Link>
                  </div>
                  <div className="text-white">{mov.description}</div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
