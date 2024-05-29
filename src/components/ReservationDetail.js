import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { FaCartShopping } from "react-icons/fa6";
import { getUID } from "../util/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { FaRegStar } from "react-icons/fa";
import firebase from "firebase/app";
import classes from "./ReservationDetail.module.css";

function ReservationDetail({ reservation }) {
  const [movie, setMovie] = useState({});
  const [hall, setHall] = useState({});
  const [show, setShow] = useState(false);
  const [passedReservation, setPassedReservation] = useState(false);
  const [numOfStars, setNumOfStars] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [review, setReview] = useState(false);
  const uid = getUID();
  const navigate = useNavigate();

  useEffect(() => {
    const nowTemp = new Date();
    const now = nowTemp.getTime();
    const reservationTime = reservation.time.toDate().getTime();
    if (now > reservationTime) setPassedReservation(true);
    else setPassedReservation(false);
    loadMovieFromFirebase(reservation.movie);
    loadHallFromFirebase(reservation.hall);
    checkReservationDay();
  }, []);

  useEffect(() => {
    if (movie && movie.reviews) {
      const checker = movie.reviews.some((mov) => uid === mov.uid);
      setHasReviewed(!checker);
      const reviewTemp = movie.reviews.find((mov) => mov.uid === uid);
      console.log(reviewTemp);
      setReview(reviewTemp);
    }
  }, [movie]);

  useEffect(() => {
    console.log(review);
  }, [review]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const date = reservation.time.toDate();
  const reservationDayShort = date.toDateString().split(" ")[0];
  let [reservationDay, setReservationDay] = useState("");
  const reservationDate = date.toLocaleDateString().split("/").join(".");
  const reservationTime = date
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");

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
          });
        }
      });

    hallOccupacyProjections[indexOfProjection] = movieProjection;

    await projectFirestore
      .collection("hallOccupacy")
      .doc(reservation.hall)
      .update({
        projections: hallOccupacyProjections,
      });

    navigate("/profile/my-reservations");
  }

  async function handleReviewHandler() {
    if (reviewDescription.length < 50) {
      setReviewError(true);
      return;
    }

    setReviewError(false);

    const now = new Date();
    const dateTime = firebase.firestore.Timestamp.fromDate(now);

    const review = {
      rating: numOfStars,
      uid: uid,
      description: reviewDescription,
      title: reviewTitle,
      dateTime: dateTime,
    };

    const movieReviews = movie.reviews;
    movieReviews.push(review);

    await projectFirestore.collection("movies").doc(movie.id).update({
      reviews: movieReviews,
    });

    setReviewDescription("");
    setReviewTitle("");
    setNumOfStars(0);
    handleClose();

    window.location.reload();
  }

  const handleChange = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };

  return (
    <div
      className="container-fluid flex-grow-1 p-4"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      {passedReservation && (
        <div className="container p-4 text-white rounded">
          <div className="row px-3">
            <h3 className="text-danger">Passed Reservation</h3>
          </div>
          <hr />
          <div className="row px-3 text-white">
            <div className="fs-5">Projection Time</div>
            <div className="text-secondary">
              {reservationDate}, {reservationTime}
            </div>
          </div>
          <hr />
          <div className="row px-3 text-white">
            <div className="fs-5">Movie</div>
            <div className="text-secondary">{movie.title}</div>
          </div>
          <hr />
          <div className="row px-3 text-white">
            <div className="fs-5">Number of tickets</div>
            <div className="text-secondary">{reservation.seats.length}</div>
          </div>
          <hr />
          <div className="row px-3 text-white">
            <div className="fs-5">Total Price</div>
            <div className="text-secondary">
              {movie.price
                ? (reservation.seats.length * movie.price)
                    .toFixed(2)
                    .replace(".", ",")
                : ""}{" "}
              MKD
            </div>
          </div>
          {hasReviewed && (
            <>
              <hr />
              <div className="row w-50 m-auto">
                <Button variant="success" onClick={handleShow}>
                  Review
                </Button>

                <Modal className="mt-5" show={show} onHide={handleClose}>
                  <Modal.Header
                    className="text-white"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                    closeButton
                  >
                    <Modal.Title>Rate this movie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    className="text-white"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="d-flex justify-content-between">
                          <span>Movie Grade</span> <span>{numOfStars}/10</span>
                        </Form.Label>
                        <div className="fs-1 d-flex justify-content-center">
                          {[...Array(10)].map((_, index) => (
                            <FaRegStar
                              key={index}
                              className={
                                numOfStars >= index + 1
                                  ? classes.selectedStar + " mx-1"
                                  : "mx-1"
                              }
                              onClick={() => setNumOfStars(index + 1)}
                            />
                          ))}
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Review Title</Form.Label>
                        <Form.Control
                          as="input"
                          rows={3}
                          value={reviewTitle}
                          onChange={handleTitleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Describe your review</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={reviewDescription}
                          onChange={handleChange}
                        />
                        {reviewError && (
                          <p className="pt-3 px-3 text-danger">
                            Please enter at least 50 characters in the
                            description field.
                          </p>
                        )}
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer
                    className="text-white"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="success" onClick={handleReviewHandler}>
                      Submit Review
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </>
          )}
          {!hasReviewed && review && (
            <>
              <hr />
              <div class="d-flex justify-content-center">
                <div class="btn btn-warning w-75">
                  Thank you for your opinion. Review rating {review.rating}/10
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {!passedReservation && (
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
                {reservationDay}, {reservationDate}, {reservationTime}
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
          {movie && (
            <div className="row px-5">
              <div className="d-inline-block col-6 text-start">Tickets:</div>
              <div className="d-inline-block col-6 text-end">
                {reservation.seats.length} x{" "}
                {movie.price ? movie.price.toFixed(2).replace(".", ",") : ""}{" "}
                MKD
              </div>
            </div>
          )}
          <hr />
          {movie && (
            <div className="row px-5">
              <div className="d-inline-block col-6 text-start">
                <FaCartShopping
                  className="fs-5"
                  style={{ color: "var(--color-third)" }}
                />{" "}
                Total Price:
              </div>
              <div className="d-inline-block col-6 text-end fw-bold fs-5">
                {movie.price
                  ? (reservation.seats.length * movie.price)
                      .toFixed(2)
                      .replace(".", ",")
                  : ""}{" "}
                MKD
              </div>
            </div>
          )}
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
      )}
    </div>
  );
}

export default ReservationDetail;
