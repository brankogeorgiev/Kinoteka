import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./MyReservations.module.css";

function MyReservations({ object }) {
  const user = object.user;
  const movies = object.movies;
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [passedMovies, setPassedMovies] = useState([]);

  useEffect(() => {
    const now = new Date();
    let passedMoviesTemp = user.reservations.filter(
      (res) => res.time.toDate().getTime() < now.getTime()
    );
    let upcomingMoviesTemp = user.reservations.filter(
      (res) => res.time.toDate().getTime() > now.getTime()
    );

    setUpcomingMovies(upcomingMoviesTemp);
    setPassedMovies(passedMoviesTemp);
  }, []);

  return (
    <div
      className={
        classes.passedReservationsDiv +
        " container-fluid d-flex flex-grow-1 p-4 row"
      }
      style={{ backgroundColor: "var(--color-secondary)" }}
      key={crypto.randomUUID()}
    >
      <div className="container text-white p-4 col-6">
        <h3 className="m-3 text-danger">Past tickets</h3>
        {passedMovies &&
          passedMovies.map((res) => {
            const movie = movies.find((mov) => mov.id == res.movie);
            const now = new Date();
            const nowArray = now.toDateString().split(" ");
            const reservationDate = res.time.toDate().toDateString().split(" ");
            const reservationTime = res.time
              .toDate()
              .toLocaleTimeString()
              .split(":")
              .splice(0, 2)
              .join(":");

            let dateOfProjectionString = "";
            if (
              nowArray[1] === reservationDate[1] &&
              nowArray[2] === reservationDate[2]
            ) {
              dateOfProjectionString = "Today";
            } else {
              let month, day;
              if (reservationDate[1] === "Jan") month = "January";
              else if (reservationDate[1] === "Feb") month = "February";
              else if (reservationDate[1] === "Mar") month = "March";
              else if (reservationDate[1] === "Apr") month = "April";
              else if (reservationDate[1] === "May") month = "May";
              else if (reservationDate[1] === "Jun") month = "June";
              else if (reservationDate[1] === "Jul") month = "July";
              else if (reservationDate[1] === "Aug") month = "August";
              else if (reservationDate[1] === "Sep") month = "September";
              else if (reservationDate[1] === "Oct") month = "October";
              else if (reservationDate[1] === "Nov") month = "November";
              else if (reservationDate[1] === "Dec") month = "December";
              day = reservationDate[2];

              dateOfProjectionString = month + " " + day;
            }

            return (
              <Link
                to={`/profile/my-reservations/${res.id}`}
                style={{ textDecoration: "none" }}
                key={res.id}
              >
                <div
                  className={classes.card + " row rounded p-3 m-2"}
                  style={{ backgroundColor: "var(--color-fourth)" }}
                >
                  <div className="col-2">
                    <img src={movie.poster} style={{ maxWidth: "75%" }} />
                  </div>
                  <div className="col-10">
                    <h4 className="pt-4">{movie.title}</h4>
                    <p className="pt-2 text-white">
                      {dateOfProjectionString}, {reservationTime}
                    </p>
                    <p className="text-secondary">
                      {res.seats.length} ticket{res.seats.length > 1 ? "s" : ""}{" "}
                      reserved
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <div
        className={
          classes.upcomingReservationsDiv + " container text-white p-4 col-6"
        }
      >
        <h3 className="m-3">Upcoming tickets</h3>
        {upcomingMovies &&
          upcomingMovies.map((res) => {
            const movie = movies.find((mov) => mov.id == res.movie);

            const now = new Date();
            const nowArray = now.toDateString().split(" ");
            const reservationDate = res.time.toDate().toDateString().split(" ");
            const reservationTime = res.time
              .toDate()
              .toLocaleTimeString()
              .split(":")
              .splice(0, 2)
              .join(":");

            let dateOfProjectionString = "";
            if (
              nowArray[1] === reservationDate[1] &&
              nowArray[2] === reservationDate[2]
            ) {
              dateOfProjectionString = "Today";
            } else {
              let month, day;
              if (reservationDate[1] === "Jan") month = "January";
              else if (reservationDate[1] === "Feb") month = "February";
              else if (reservationDate[1] === "Mar") month = "March";
              else if (reservationDate[1] === "Apr") month = "April";
              else if (reservationDate[1] === "May") month = "May";
              else if (reservationDate[1] === "Jun") month = "June";
              else if (reservationDate[1] === "Jul") month = "July";
              else if (reservationDate[1] === "Aug") month = "August";
              else if (reservationDate[1] === "Sep") month = "September";
              else if (reservationDate[1] === "Oct") month = "October";
              else if (reservationDate[1] === "Nov") month = "November";
              else if (reservationDate[1] === "Dec") month = "December";
              day = reservationDate[2];

              dateOfProjectionString = month + " " + day;
            }

            return (
              <Link
                to={`/profile/my-reservations/${res.id}`}
                style={{ textDecoration: "none" }}
                key={res.id}
              >
                <div
                  className={classes.card + " row rounded p-3 m-2"}
                  style={{ backgroundColor: "var(--color-fourth)" }}
                >
                  <div className="col-2">
                    <img src={movie.poster} style={{ maxWidth: "75%" }} />
                  </div>
                  <div className="col-10">
                    <h4 className="pt-4">{movie.title}</h4>
                    <p className="pt-2 text-white">
                      {dateOfProjectionString}, {reservationTime}
                    </p>
                    <p className="text-secondary">
                      {res.seats.length} ticket{res.seats.length > 1 ? "s" : ""}{" "}
                      reserved
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default MyReservations;
