import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";

function AddMovieProjection({ data }) {
  const movies = data.movies;
  const halls = data.halls;

  // console.log(halls);

  const [formData, updateFormData] = useState({
    movieId: "",
    hallId: "",
    date: "",
    time: "",
  });

  async function getEmptyHall(hallId) {
    let foundHall = {};
    try {
      await projectFirestore
        .collection("halls")
        .doc(hallId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            foundHall = {
              id: doc.id,
              ...doc.data(),
            };
          }
        });
      console.log(foundHall);
    } catch (err) {
      console.log("Failed loading hall: ", err);
    }
  }

  function handleChange(e) {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  function findHallById(hallId) {
    return halls.find((tmp) => tmp.id == hallId);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (
      formData.movieId == undefined ||
      formData.movieId === "" ||
      formData.hallId == undefined ||
      formData.hallId === "" ||
      formData.date == undefined ||
      formData.date === "" ||
      formData.time == undefined ||
      formData.time === ""
    ) {
      // Throw an error message
      return;
    }

    const dateTime = new Date(formData.date + "T" + formData.time);
    const timestamp = firebase.firestore.Timestamp.fromDate(dateTime);

    const movieProjectionId = crypto.randomUUID();
    const foundHall = findHallById(formData.hallId);

    const dataToSend = {
      movie: formData.movieId,
      time: timestamp,
      hall: foundHall,
      id: movieProjectionId,
    };

    let projections = [];

    try {
      await projectFirestore
        .collection("hallOccupacy")
        .doc(formData.hallId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            projections = doc.data().projections;
            projections.push(dataToSend);
          }
        });
    } catch (err) {
      console.log("Failed getting document: ", err);
    }

    try {
      await projectFirestore
        .collection("hallOccupacy")
        .doc(formData.hallId)
        .update({
          projections: projections,
        });
    } catch (err) {
      console.log("Error adding a movie projection: ", err);
    }

    let movieProjections = movies.find(
      (tmp) => tmp.id === formData.movieId
    ).projections;

    let movieProjectionToPush = {
      time: timestamp,
      hall: formData.hallId,
      id: movieProjectionId,
    };

    movieProjections.push(movieProjectionToPush);

    try {
      await projectFirestore.collection("movies").doc(formData.movieId).update({
        projections: movieProjections,
      });
    } catch (err) {
      console.log("Failed to append movie projection: ", err);
    }
  }

  return (
    <div className="container m-5 p-5">
      <form>
        <div className="form-group">
          <div className="row m-3 p-3">
            <div className="col">
              <label htmlFor="movieId">Select movie</label>
              <select
                name="movieId"
                className="form-control"
                id="movieId"
                onChange={handleChange}
              >
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
              >
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
            <div className="col">
              <label htmlFor="date">Projection date</label>
              <input
                name="date"
                type="date"
                className="form-control"
                onChange={handleChange}
              ></input>
            </div>
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
  );
}

export default AddMovieProjection;
