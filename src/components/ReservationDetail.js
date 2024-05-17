import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { FaCartShopping } from "react-icons/fa6";
import { getUID } from "../util/auth";
import { useNavigate } from "react-router-dom";

function ReservationDetail({ reservation }) {
  const [movie, setMovie] = useState({});
  const [hall, setHall] = useState({});
  const navigate = useNavigate();

  const date = reservation.time.toDate();
  const reservationDayShort = date.toDateString().split(" ")[0];
  let [reservationDay, setReservationDay] = useState("");
  const reservationDate = date.toLocaleDateString().split("/").join(".");
  const reservationTime = date
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");

  useEffect(() => {
    loadMovieFromFirebase(reservation.movie);
    loadHallFromFirebase(reservation.hall);
    checkReservationDay();
  }, []);

  function checkReservationDay() {
    const [month, day] = reservationDate.split(".").splice(0, 2);
    const now = new Date();
    const [nowMonth, nowDay] = now.toLocaleDateString().split("/").splice(0, 2);

    if (month === nowMonth && day === nowDay) setReservationDay("Today");
    else if (reservationDayShort === "Mon") setReservationDay("Monday");
    else if (reservationDayShort === "Tue") setReservationDay("Tuesday");
    else if (reservationDayShort === "Wed") setReservationDay("Wednesday");
    else if (reservationDayShort === "Thu") setReservationDay("Thursday");
    else if (reservationDayShort === "Fri") setReservationDay("Friday");
    else if (reservationDayShort === "Sat") setReservationDay("Saturday");
    else if (reservationDayShort === "Sun") setReservationDay("Sunday");
  }

  async function loadMovieFromFirebase(movieId) {
    let movieFromDb;
    await projectFirestore
      .collection("movies")
      .doc(movieId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          movieFromDb = doc.data();
          movieFromDb.id = doc.id;
          setMovie(movieFromDb);
        }
      });
  }

  async function loadHallFromFirebase(hallId) {
    let hallFromDb = {};
    await projectFirestore
      .collection("halls")
      .doc(hallId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          hallFromDb = doc.data();
          hallFromDb.id = doc.id;
          setHall(hallFromDb);
        }
      });
  }

  async function handleDeleteReservation() {
    const reservationId = reservation.id;
    let user = {};
    const uid = getUID();

    await projectFirestore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          user = doc.data();
          user.id = uid;

          const reservationFromUser = user.reservations.find(
            (res) => res.id === reservation.id
          );
          const indexOfReservation =
            user.reservations.indexOf(reservationFromUser);
          user.reservations.splice(indexOfReservation, 1);
        }
      });

    await projectFirestore.collection("users").doc(uid).update({
      reservations: user.reservations,
    });

    let movieProjectionHall,
      hallOccupacyProjections,
      movieProjection,
      indexOfProjection;

    await projectFirestore
      .collection("hallOccupacy")
      .doc(reservation.hall)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const hallOccupacy = doc.data();
          hallOccupacyProjections = hallOccupacy.projections;
          indexOfProjection = hallOccupacyProjections.findIndex(
            (proj) => proj.id === reservation.movieProjectionId
          );
          movieProjection = hallOccupacyProjections.find(
            (hp) => hp.id === reservation.movieProjectionId
          );
          movieProjectionHall = movieProjection.hall;
          reservation.seats.forEach((seat) => {
            movieProjectionHall.rows[seat.row].seats[seat.seat].reserved =
              false;
            // console.log(movieProjection);
          });
        }
      });

    console.log(movieProjectionHall);
    console.log(indexOfProjection);
    console.log(movieProjection);
    console.log(hallOccupacyProjections);

    hallOccupacyProjections[indexOfProjection] = movieProjection;
    console.log(hallOccupacyProjections);

    // movieProjectionHall.projections[indexOfProjection] = movieProjection;
    // console.log(movieProjectionHall);

    await projectFirestore
      .collection("hallOccupacy")
      .doc(reservation.hall)
      .update({
        projections: hallOccupacyProjections,
      });

    navigate("/profile/my-reservations");
  }

  return (
    <div
      className="container-fluid p-4"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div
        className="container p-4 text-white rounded"
        style={{ backgroundColor: "var(--color-fourth)" }}
      >
        <div className="row p-3 m-2">
          <div className="col-2">
            <img
              src={movie.poster}
              alt="Movie poster"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="col-10">
            <h4 className="p-4">{movie.title}</h4>
            <p className="px-4 py-1">
              {reservationDay}, {reservationTime}
            </p>
            <p className="px-4 py-1">{hall.name}</p>
          </div>
        </div>
        <hr />
        <div className="row px-5">
          <div className="d-inline-block col-3">{hall.name}</div>
          <div className="d-inline-block col-3">
            Row: {reservation.seats[0].row + 1} Seat
            {reservation.seats.length > 1 ? "s" : ""}:{" "}
            {reservation.seats[0].seat + 1}{" "}
            {reservation.seats.length > 1 ? "- " : ""}
            {reservation.seats.length > 1
              ? reservation.seats[reservation.seats.length - 1].seat + 1
              : ""}
          </div>
        </div>
        <hr />
        <div className="row px-5">
          <div className="d-inline-block col-6 text-start">Tickets:</div>
          <div className="d-inline-block col-6 text-end">
            {reservation.seats.length} X 100,00 MKD
          </div>
        </div>
        <hr />
        <div className="row px-5">
          <div className="d-inline-block col-6 text-start">
            <FaCartShopping
              className="fs-5"
              style={{ color: "var(--color-third)" }}
            />{" "}
            Total Price:
          </div>
          <div className="d-inline-block col-6 text-end fw-bold fs-5">
            100,00 MKD
          </div>
        </div>
        <hr />
        <div className="row px-5">
          <button
            type="button"
            className="btn btn-danger btn-sm p-2"
            onClick={handleDeleteReservation}
          >
            DELETE RESERVATION
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;
