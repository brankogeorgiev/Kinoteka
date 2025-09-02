import { Link } from "react-router-dom";
import classes from "./AdminMoviesList.module.css";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { projectFirestore } from "../firebase/config.js";
import { FaPlus } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useState } from "react";

function AdminMoviesList({ movies }) {
  const [movieList, setMovieList] = useState(movies);

  const handleDelete = async (id) => {
    projectFirestore.collection("movies").doc(id).delete();

    setMovieList(movieList.filter((mov) => mov.id !== id));
  };

  return (
    <div className={classes.movies_list}>
      <div className={classes.movies_list_inner}>
        <div>
          <div className="d-flex justify-content-between ps-5">
            <h1>Movies settings</h1>
            <div className="my-auto">
              <Link to="/admin/movies/add-movie">
                <button
                  style={{ backgroundColor: "var(--color-fifth)" }}
                  className="btn m-1 text-white"
                >
                  <FaPlus className="mb-1" /> Add new movie
                </button>
              </Link>
              <Link to="/admin/add-movie-projection">
                <button className="btn btn-primary m-1 text-white">
                  Add movie projection <BiSolidMoviePlay />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <ul>
          {movieList.map((movie) => (
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
