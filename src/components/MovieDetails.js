import { useEffect, useState } from "react";
import classes from "./MovieDetails.module.css";
import { Link, useRouteLoaderData } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { MdStar } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { getUID } from "../util/auth";

function MovieDetails({ movie }) {
  const { token } = useRouteLoaderData("root");
  const [halls, setHalls] = useState([]);
  const [user, setUser] = useState({});
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [movieProjectionsToShow, setMovieProjectionsToShow] = useState([]);
  const movieRating =
    movie.reviews.length !== 0
      ? (
          movie.reviews
            .map((rev) => rev.rating)
            .reduce((acc, curr) => acc + curr, 0) / movie.reviews.length
        ).toFixed(1)
      : movie.rating;

  const now = new Date();
  const movieProjections = movie.projections.filter(
    (mov) =>
      mov.time.seconds * 1000 + mov.time.nanoseconds / 1000000 >= now.getTime()
  );
  const movieProjectionsSorted = movieProjections.sort(
    (a, b) =>
      a.time.seconds * 1000 +
      a.time.nanoseconds / 1000000 -
      (b.time.seconds * 1000 + b.time.nanoseconds / 1000000)
  );

  useEffect(() => {
    loadUser();
    setMovieProjectionsToShow(movieProjectionsSorted);
  }, []);

  useEffect(() => {
    setIsMovieFavoriteForUser();
  }, [user]);

  async function loadUser() {
    if (!token) return;
    const uid = getUID();
    let userFromDb;
    await projectFirestore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          userFromDb = doc.data();
          userFromDb.id = uid;
        }
      });
    setUser(userFromDb);
  }

  const getHallName = (hall) => {
    const foundHall = halls.find((tmp) => tmp.id === hall);
    setTimeout(() => {}, 5000);
    return foundHall ? foundHall.name : "Unknown";
  };

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const snapshot = await projectFirestore.collection("halls").get();
        const hallsData = snapshot.docs.map((hall) => ({
          id: hall.id,
          ...hall.data(),
        }));
        setHalls(hallsData);
        setTimeout(() => {}, 5000);
      } catch (err) {
        console.log("Error fetching halls: ", err);
      }
    };

    fetchHalls();
  }, []);

  async function handleFavoritesClick() {
    const movieId = movie.id;
    const uid = getUID();
    if (user.favoriteMovies.includes(movieId)) {
      const indexOfMovie = user.favoriteMovies.indexOf(movieId);
      user.favoriteMovies.splice(indexOfMovie, 1);
    } else {
      user.favoriteMovies.push(movieId);
    }
    await projectFirestore.collection("users").doc(uid).update({
      favoriteMovies: user.favoriteMovies,
    });
    setIsMovieFavoriteForUser();
    return;
  }

  function setIsMovieFavoriteForUser() {
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movie.id)) {
      setIsMovieFavorite(true);
    } else {
      setIsMovieFavorite(false);
    }
  }

  return (
    <>
      <div className={classes.movie_details_container}>
        <div className={classes.movie_details}>
          <div className={classes.row}>
            <h1>
              Movie Title: {movie.title}{" "}
              {token && (
                <span>
                  {isMovieFavorite && (
                    <button
                      style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={handleFavoritesClick}
                    >
                      <FaHeart style={{ color: "red" }} />
                    </button>
                  )}
                  {!isMovieFavorite && (
                    <button
                      style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={handleFavoritesClick}
                    >
                      <FaRegHeart style={{ color: "red" }} />
                    </button>
                  )}
                </span>
              )}
            </h1>
          </div>
          <div className={classes.row}>
            <iframe
              src={movie.trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              webkitallowfullscreen="true"
            ></iframe>
          </div>
          <div className={classes.row}>
            <img src={movie.poster} alt={movie.description} />
            <table id="movie-details">
              <tbody>
                <tr>
                  <td>
                    <div className={classes.movie_label}>
                      <div>Movie Director:</div>
                    </div>
                  </td>
                  <td>{movie.director}</td>
                </tr>
                <tr>
                  <td>
                    <div className={classes.movie_label}>
                      <div>Movie Duration:</div>
                    </div>
                  </td>
                  <td>{movie.durationTime} min</td>
                </tr>
                <tr>
                  <td>
                    <div className={classes.movie_label}>
                      <div>Movie Description:</div>
                    </div>
                  </td>
                  <td>{movie.description}</td>
                </tr>
                <tr>
                  <td>
                    <div className={classes.movie_label}>
                      <div>Movie Rating:</div>
                    </div>
                  </td>
                  <td>
                    {movieRating} <MdStar />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={classes.movie_label}>
                      <div>Release Date:</div>
                    </div>
                  </td>
                  <td>
                    {new Date(
                      movie.releaseDate.seconds * 1000 +
                        movie.releaseDate.nanoseconds / 1000000
                    ).toLocaleDateString("en-UK", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {movieProjectionsToShow.length > 0 && (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th className="col text-center">Date</th>
                    <th className="col text-center">Time</th>
                    <th className="col text-center">Hall</th>
                    <th className="col text-center">Tickets</th>
                  </tr>
                </thead>
                <tbody>
                  {movieProjectionsToShow.map((pr, index) => {
                    const time = pr.time;
                    let date = new Date(
                      time.seconds * 1000 + time.nanoseconds / 1000000
                    );
                    date.setHours(date.getHours() + 2);
                    date = encodeURIComponent(date.toISOString());
                    date = date.split(".")[0] + "%2B02%3A00";

                    return (
                      <tr key={index}>
                        <td className="col text-center">
                          {pr.time.toDate().toString().split(" ")[0] +
                            ", " +
                            pr.time.toDate().toLocaleString().split(",")[0]}
                        </td>
                        <td className="col text-center">
                          {pr.time
                            .toDate()
                            .toLocaleString()
                            .split(",")[1]
                            .split(":")[0] +
                            ":" +
                            pr.time
                              .toDate()
                              .toLocaleString()
                              .split(",")[1]
                              .split(":")[1]}
                        </td>
                        <td className="col text-center">
                          {getHallName(pr.hall)}
                        </td>
                        <td className="col text-center">
                          <Link to={`/movies/${movie.id}/${pr.hall}/${pr.id}`}>
                            Reserve your tickets
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {movie.projections.length === 0 && (
            <h4 className="text-center">No scheduled projections for now.</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
