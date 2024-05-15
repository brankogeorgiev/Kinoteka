import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { LuArmchair } from "react-icons/lu";

import classes from "./Hall.module.css";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

function MovieProjection({ movieProjection }) {
  const navigate = useNavigate();
  const [numOfSeats, setNumOfSeats] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [movie, setMovie] = useState(null);
  const hall = movieProjection.hall;
  const { token } = useRouteLoaderData("root");

  async function getMovie(movieId) {
    try {
      await projectFirestore
        .collection("movies")
        .doc(movieId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setMovie(doc.data());
          } else {
            console.log("Could not find that movie");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (movieProjection) {
      getMovie(movieProjection.movie);
    }
  }, [movieProjection]);

  function handleSeatClicked(rowIndex, seatIndex) {
    let seat = hall.rows[rowIndex].seats[seatIndex];
    if (!seat.reserve) {
      setShowErrorMessage(false);
      setSelectedSeats([]);
      let tempSelectedSeats = [];
      if (seatIndex + numOfSeats <= hall.rows[rowIndex].seats.length) {
        for (let i = 0; i < numOfSeats; i++) {
          if (!hall.rows[rowIndex].seats[seatIndex + i].reserved) {
            tempSelectedSeats.push([rowIndex, seatIndex + i]);
          } else {
            tempSelectedSeats = [];
            setShowErrorMessage(true);
            break;
          }
        }
        setSelectedSeats(tempSelectedSeats);
      } else {
        tempSelectedSeats = [];
        setShowErrorMessage(true);
      }
    }
  }

  function checkSeatAvailability(row, seat) {
    let flag = selectedSeats.some((item) => {
      return item[0] === row && item[1] === seat;
    });
    return flag;
  }

  let projections, foundProjectionIndex;

  async function handleReserve() {
    if (!token) {
      return navigate("/auth?type=login");
    }
    try {
      await projectFirestore
        .collection("hallOccupacy")
        .doc(hall.name.split(" ").join("").toLowerCase())
        .get()
        .then((doc) => {
          if (doc.exists) {
            projections = doc.data().projections;
            foundProjectionIndex = projections.findIndex((proj) => {
              return (
                JSON.stringify(proj.time) ==
                  JSON.stringify(movieProjection.time) &&
                JSON.stringify(proj.movie) ==
                  JSON.stringify(movieProjection.movie) &&
                JSON.stringify(proj.hall.name) ==
                  JSON.stringify(movieProjection.hall.name)
              );
            });
            console.log(foundProjectionIndex);
          } else {
            console.log("Could not find that hall");
          }
        });
    } catch (err) {
      console.log(err);
    }

    selectedSeats.forEach((tmp) => {
      const row = tmp[0];
      const seat = tmp[1];
      hall.rows[row].seats[seat].reserved = true;
    });

    movieProjection.hall = hall;

    projections[foundProjectionIndex] = movieProjection;

    let objectToSend = {
      name: hall.name,
      projections: projections,
    };

    try {
      await projectFirestore
        .collection("hallOccupacy")
        .doc(hall.name.split(" ").join("").toLowerCase()) // !!!!!!!!!!!!!!!!!!!!
        .set(objectToSend);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  }

  return (
    <>
      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <div className={classes.inputSeats}>
            <div className={classes.labelNumOfSeats}>Number of seats: </div>
            <div className={classes.numOfSeats}>
              {[...Array(6)].map((_, index) => (
                <LuArmchair
                  key={index}
                  className={
                    numOfSeats >= index + 1 ? classes.selectedSeat : ""
                  }
                  onClick={() => setNumOfSeats(index + 1)}
                />
              ))}
            </div>
          </div>
          <div className={classes.hallArea}>
            <h5>Select the first wanted seat</h5>
            {hall &&
              hall.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{ margin: "1rem", padding: "0.5rem" }}
                >
                  Row {row.row}:
                  {row.seats.map((seat, seatIndex) => (
                    <span
                      key={seatIndex}
                      style={{
                        backgroundColor: seat.reserved ? "gray" : "lightgray",
                        padding: "0.5rem",
                        margin: "0.25rem",
                        fontSize: "1.5rem",
                      }}
                      className={
                        checkSeatAvailability(rowIndex, seatIndex)
                          ? classes.seatReserving
                          : ""
                      }
                      onClick={() => handleSeatClicked(rowIndex, seatIndex)}
                    >
                      <LuArmchair className={classes.singleChair} />
                    </span>
                  ))}
                </div>
              ))}
          </div>
          {showErrorMessage && <h5>Select available seats</h5>}
          <button onClick={handleReserve}>Reserve</button>
        </div>
      )}
    </>
  );
}

export default MovieProjection;
