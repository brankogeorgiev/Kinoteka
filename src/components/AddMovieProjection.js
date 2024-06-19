import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";

function AddMovieProjection({ data }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const movies = data.movies;
  const halls = data.halls;
  const [error, setError] = useState(null);

  const [formData, updateFormData] = useState({
    movieId: "",
    hallId: "",
    date: null,
    time: "",
    from: null,
    to: null,
  });

  function handleChange(e) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  function findHallById(hallId) {
    return halls.find((tmp) => tmp.id === hallId);
  }

  function checkHallAvailability(
    projToAddStart,
    projToAddEnd,
    loopedProjStart,
    loopedProjEnd
  ) {
    const projToAddBetween =
      projToAddStart.getTime() +
      (projToAddEnd.getTime() - projToAddStart.getTime()) / 2;
    if (projToAddStart > loopedProjEnd || projToAddEnd < loopedProjStart) {
      setError(null);
      return true;
    } else if (
      projToAddBetween > loopedProjStart &&
      projToAddBetween < loopedProjEnd
    ) {
      setError("Another movie is already playing in that time in the hall!");
      return false;
    } else {
      setError("Another movie is already playing in that time in the hall!");
      return false;
    }
  }

  async function fetchHallProjections(hallId) {
    let projections = [];
    try {
      const doc = await projectFirestore
        .collection("hallOccupacy")
        .doc(hallId)
        .get();
      if (doc.exists) {
        projections = doc.data().projections;
      }
    } catch (err) {
      console.log("Failed getting document: ", err);
      throw new Error("Failed getting document");
    }
    return projections;
  }

  async function updateProjections(dataToSend, projections, projectionsToPush) {
    let projectionsToPushForMovie = [];

    projectionsToPush &&
      projectionsToPush.forEach((proj) => {
        const projToPush = {
          hall: proj.hall.id,
          id: proj.id,
          time: proj.time,
        };
        projectionsToPushForMovie.push(projToPush);
      });

    try {
      let hallProjections = [];

      await projectFirestore
        .collection("hallOccupacy")
        .doc(dataToSend.hall.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            hallProjections = doc.data().projections;
          }
        });

      if (!projectionsToPush) {
        let movieProjections = movies.find(
          (tmp) => tmp.id === dataToSend.movie
        ).projections;
        let movieProjectionToPush = {
          time: dataToSend.time,
          hall: dataToSend.hall.id,
          id: dataToSend.id,
        };

        movieProjections.push(movieProjectionToPush);
        hallProjections.push(dataToSend);

        await projectFirestore
          .collection("movies")
          .doc(dataToSend.movie)
          .update({ projections: movieProjections });

        await projectFirestore
          .collection("hallOccupacy")
          .doc(dataToSend.hall.id)
          .update({ projections: hallProjections });
        // End of Single Projection Addition
      } else {
        let projectionsForMovie = [];
        await projectFirestore
          .collection("movies")
          .doc(dataToSend.movie)
          .get()
          .then((doc) => {
            if (doc.exists) {
              projectionsForMovie = doc.data().projections;
            }
          });

        console.log(hallProjections, projectionsToPush);

        await projectFirestore
          .collection("movies")
          .doc(dataToSend.movie)
          .update({
            projections: [...projectionsForMovie, ...projectionsToPushForMovie],
          });

        await projectFirestore
          .collection("hallOccupacy")
          .doc(dataToSend.hall.id)
          .update({
            projections: [...hallProjections, ...projectionsToPush],
          });
      }

      navigate("/admin/movies");
    } catch (err) {
      console.log("Error updating Firestore: ", err);
    }
  }

  async function addSingleProjection(dataToSend) {
    const projections = await fetchHallProjections(dataToSend.hall.id);

    const movie = movies.find((mov) => mov.id === dataToSend.movie);
    const projectionToAddMillisStart = dataToSend.time.toDate();
    const millisecondsToAdd =
      projectionToAddMillisStart.getTime() + movie.durationTime * 60000;
    const roundedMinutes = Math.ceil(millisecondsToAdd / (15 * 60000)) * 15;
    const roundedMilliseconds = roundedMinutes * 60000;
    const projectionToAddMillisEnd = new Date(roundedMilliseconds);

    const outcome = projections.every((proj) => {
      const movieTemp = movies.find((mov) => mov.id === proj.movie);
      const startTime = new Date(
        proj.time.seconds * 1000 + proj.time.nanoseconds / 1000000
      );
      const millisecondsToAddTemp =
        startTime.getTime() + movieTemp.durationTime * 60000;
      const roundedMinutesTemp =
        Math.ceil(millisecondsToAddTemp / (15 * 60000)) * 15;
      const roundedMillisecondsTemp = roundedMinutesTemp * 60000;
      const endTime = new Date(roundedMillisecondsTemp);

      return checkHallAvailability(
        projectionToAddMillisStart,
        projectionToAddMillisEnd,
        startTime,
        endTime
      );
    });

    if (outcome) {
      projections.push(dataToSend);
      await updateProjections(dataToSend, projections);
    }
  }

  async function addMultipleProjections(dataToSend, fromDate, toDate) {
    const projections = await fetchHallProjections(dataToSend.hall.id);
    const movie = movies.find((mov) => mov.id === dataToSend.movie);
    const { time } = formData;
    const [hours, minutes] = time.split(":").map(Number);
    const timeMillis = (hours * 3600 + minutes * 60) * 1000;

    let valid = true;
    for (
      let date = new Date(fromDate);
      date <= toDate;
      date.setDate(date.getDate() + 1)
    ) {
      const projectionToAddMillisStart = new Date(date);
      projectionToAddMillisStart.setMilliseconds(
        timeMillis - 2 * 60 * 60 * 1000
      );
      const millisecondsToAdd =
        projectionToAddMillisStart.getTime() + movie.durationTime * 60000;
      const roundedMinutes = Math.ceil(millisecondsToAdd / (15 * 60000)) * 15;
      const roundedMilliseconds = roundedMinutes * 60000;
      const projectionToAddMillisEnd = new Date(roundedMilliseconds);

      const outcome = projections.every((proj) => {
        const movieTemp = movies.find((mov) => mov.id === proj.movie);
        const startTime = new Date(
          proj.time.seconds * 1000 + proj.time.nanoseconds / 1000000
        );
        const millisecondsToAddTemp =
          startTime.getTime() + movieTemp.durationTime * 60000;
        const roundedMinutesTemp =
          Math.ceil(millisecondsToAddTemp / (15 * 60000)) * 15;
        const roundedMillisecondsTemp = roundedMinutesTemp * 60000;
        const endTime = new Date(roundedMillisecondsTemp);

        return checkHallAvailability(
          projectionToAddMillisStart,
          projectionToAddMillisEnd,
          startTime,
          endTime
        );
      });

      if (!outcome) {
        valid = false;
        break;
      }
    }

    let projectionsToPushForMovieTemp = [];
    if (valid) {
      for (
        let date = new Date(fromDate);
        date <= toDate;
        date.setDate(date.getDate() + 1)
      ) {
        const projectionToAddMillisStart = new Date(date);
        projectionToAddMillisStart.setMilliseconds(
          timeMillis - 2 * 60 * 60 * 1000
        );
        const timestamp = firebase.firestore.Timestamp.fromDate(
          projectionToAddMillisStart
        );

        const dataToSendWithTime = {
          ...dataToSend,
          time: timestamp,
          id: crypto.randomUUID(),
        };

        projectionsToPushForMovieTemp.push(dataToSendWithTime);
      }
      await updateProjections(
        dataToSend,
        projections,
        projectionsToPushForMovieTemp
      );
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!formData.movieId || !formData.hallId || !formData.time) {
      setError("Please fill all the fields");
      return;
    } else {
      setError(null);
    }

    // const movieProjectionId = crypto.randomUUID();
    const foundHall = findHallById(formData.hallId);

    if (!checked) {
      const date = !!formData.date
        ? new Date(formData.date + "T" + formData.time)
        : null;
      const timestamp = !!date
        ? firebase.firestore.Timestamp.fromDate(date)
        : null;

      if (date !== null) {
        const dataToSend = {
          movie: formData.movieId,
          time: timestamp,
          hall: foundHall,
          id: crypto.randomUUID(),
        };
        await addSingleProjection(dataToSend);
      }
    } else {
      const fromTime = !!formData.from ? new Date(formData.from) : null;
      const toTime = !!formData.to ? new Date(formData.to) : null;

      if (fromTime && toTime) {
        const dataToSend = {
          movie: formData.movieId,
          hall: foundHall,
          // id: movieProjectionId,
        };
        await addMultipleProjections(dataToSend, fromTime, toTime);
      }
    }
  }

  function handleMultipleAtOnceChange(e) {
    setChecked(!checked);
  }

  return (
    <div
      className="container-fluid flex-grow-1 text-white"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="container m-5 p-5">
        <h3
          className="offset-2 mb-5 pb-2 text-center"
          style={{
            color: "var(--color-primary)",
            borderBottom: "1px solid var(--color-primary)",
          }}
        >
          Add movie projection
        </h3>
        {error && <h3 className="text-danger">{error}</h3>}
        <form className="offset-2">
          <div className="form-group">
            <div className="row m-3 p-3">
              <div className="col">
                <label htmlFor="movieId">Select movie</label>
                <select
                  name="movieId"
                  className="form-control"
                  id="movieId"
                  onChange={handleChange}
                  required
                >
                  <option value={null}>---</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="hallId">Select hall</label>
                <select
                  name="hallId"
                  className="form-control"
                  id="hallId"
                  onChange={handleChange}
                  required
                >
                  <option value={null}>---</option>
                  {halls.map((hall) => (
                    <option key={hall.id} value={hall.id}>
                      {hall.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row m-3 p-3">
              <div className="col px-5">
                <input
                  type="checkbox"
                  id="multiple-projections"
                  checked={checked}
                  onChange={handleMultipleAtOnceChange}
                />
                <label className="ps-2" htmlFor="multiple-projections">
                  Add for multiple projections at once
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row m-3 p-3">
              {!checked && (
                <div className="col">
                  <label htmlFor="date">Projection date</label>
                  <input
                    name="date"
                    id="date"
                    type="date"
                    className="form-control"
                    onChange={handleChange}
                  ></input>
                </div>
              )}
              {checked && (
                <>
                  <div className="col">
                    <label htmlFor="from">From</label>
                    <input
                      name="from"
                      id="from"
                      type="date"
                      className="form-control"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="col">
                    <label htmlFor="to">To</label>
                    <input
                      name="to"
                      id="to"
                      type="date"
                      className="form-control"
                      onChange={handleChange}
                    ></input>
                  </div>
                </>
              )}
              <div className="col">
                <label htmlFor="time">Projection time</label>
                <input
                  name="time"
                  type="time"
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleFormSubmit}
              type="submit"
              className="btn btn-primary p-2 m-1"
            >
              Add projection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovieProjection;
