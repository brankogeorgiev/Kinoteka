import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";

function ProfileFavoriteMovies({ object }) {
  const movies = object.movies;
  const user = object.user;
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(
      movies.filter((mov) => user.favoriteMovies.includes(mov.id))
    );
  }, []);

  async function handleRemoveMovieFromFavorites(e, movieId) {
    e.preventDefault();
    const uid = user.id;
    const indexOfMovie = user.favoriteMovies.indexOf(movieId);
    user.favoriteMovies.splice(indexOfMovie, 1);
    await projectFirestore.collection("users").doc(uid).update({
      favoriteMovies: user.favoriteMovies,
    });
    window.location.reload();
  }

  return (
    <div
      className="container-fluid flex-grow-1"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="row col-10 offset-1">
        <h1
          className="ps-5 py-3 col-10 offset-1"
          style={{
            color: "var(--color-primary)",
            borderBottom: "1px solid var(--color-primary)",
          }}
        >
          Favorite movies
        </h1>
        <div className="container p-4 text-white col-10 offset-1">
          {favoriteMovies &&
            favoriteMovies.map((element) => (
              <Link to={"/movies/" + element.id} key={element.id}>
                <div
                  key={element.id}
                  style={{ display: "inline-block" }}
                  className="card bg-dark text-white m-3"
                >
                  <img
                    className="card-img"
                    src={element.poster}
                    alt="Card"
                    style={{
                      opacity: "0.75",
                      width: "15rem",
                      height: "22.5rem",
                    }}
                  />
                  <div className="card-img-overlay">
                    <button
                      className="p-2"
                      style={{
                        backgroundColor: "#282727",
                        border: "none",
                        opacity: "0.75",
                      }}
                      onClick={(e) =>
                        handleRemoveMovieFromFavorites(e, element.id)
                      }
                    >
                      <FaHeart
                        style={{
                          color: "red",
                          fontSize: "2rem",
                          opacity: "0.75",
                          verticalAlign: "top",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileFavoriteMovies;
