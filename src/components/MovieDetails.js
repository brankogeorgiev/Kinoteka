import { useEffect, useState } from "react";
import classes from "./MovieDetails.module.css";
import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { MdStar } from "react-icons/md";

function MovieDetails({ movie }) {
  // const time = movie.projections[0].time;
  // let date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
  // date.setHours(date.getHours() + 2);
  // date = encodeURIComponent(date.toISOString());
  // date = date.split(".")[0] + "%2B02%3A00";

  const [halls, setHalls] = useState([]);

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

  return (
    <>
      <div className={classes.movie_details_container}>
        <div className={classes.movie_details}>
          <div className={classes.row}>
            <h1>Movie Title: {movie.title}</h1>
          </div>
          <div className={classes.row}>
            <iframe
              src={movie.trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
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
                    {movie.rating} <MdStar />
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
            {/* <div className={classes.movie_informations}>
              <div className={classes.movie_label}>
                <div>Movie Director:</div> {movie.director}
              </div>
              <div className={classes.movie_label}>
                <div>Movie Duration:</div> {movie.durationTime} min
              </div>
              <div className={classes.movie_label}>
                <div>Movie Description:</div> {movie.description}
              </div>
              <div className={classes.movie_label}>
                <div>Movie Rating:</div> {movie.rating}
              </div>
              <div className={classes.movie_label}>
                <div>Release Date:</div>{" "}
                {new Date(
                  movie.releaseDate.seconds * 1000 +
                    movie.releaseDate.nanoseconds / 1000000
                ).toLocaleDateString("en-UK", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </div>
              <div className={classes.movie_label}>
                <div>Actors:</div>{" "}
                {movie.actors ? movie.actors.join(", ") : "No actors to show!"}
              </div>
            </div> */}
          </div>
          {movie.projections.length > 0 && (
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
                  {movie.projections.map((pr, index) => {
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
                          <Link to={`/movies/${movie.id}/${pr.hall}/${date}`}>
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
