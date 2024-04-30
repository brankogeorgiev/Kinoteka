import { Link } from "react-router-dom";
import classes from "./AdminMoviesList.module.css";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { projectFirestore } from "../firebase/config.js";

function AdminMoviesList({ movies }) {
  const handleDelete = (id) => {
    projectFirestore.collection("movies").doc(id).delete();
    window.location.reload();
  };

  return (
    <div className={classes.movies_list}>
      <div className={classes.movies_list_inner}>
        <div>
          <h1>Movie settings</h1>
          <button>
            <Link to="/admin/movies/add-movie">Add new movie</Link>
          </button>
        </div>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img src={movie.poster} alt={movie.description} />
              </Link>
              <div className={classes.movie_informations}>
                <div className={classes.movie_label}>
                  <Link to={`/movies/${movie.id}`}>
                    <h5>{movie.title}</h5>
                  </Link>
                </div>
                <div className={classes.movie_label}>
                  <div>{movie.director}</div>
                </div>
              </div>
              <div className={classes.controls}>
                <Link to={`/admin/movies/edit/${movie.id}`}>
                  <TbEdit style={{ color: "lightgreen", cursor: "pointer" }} />
                </Link>
                <MdOutlineDeleteForever
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(movie.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminMoviesList;
