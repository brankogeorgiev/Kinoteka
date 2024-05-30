import classes from "./LoginForm.module.css";
import { projectFirestore } from "../firebase/config.js";
import firebase from "firebase/app";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

function AddNewMovie({ movie, movieIsEdited }) {
  const title = useRef();
  const director = useRef();
  const genre = useRef();
  const releaseDate = useRef();
  const durationTime = useRef();
  const poster = useRef();
  const image = useRef();
  const trailer = useRef();
  const description = useRef();
  const mainActor = useRef();
  const coMainActor = useRef();
  const thirdActor = useRef();
  const fourthActor = useRef();
  const otherActors = useRef();

  const timestamp = movie ? movie.releaseDate : null;
  const releaseDateString = timestamp
    ? timestamp.toDate().toISOString().split("T")[0]
    : "";

  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const releaseDateTemp = new Date(releaseDate.current.value);
    const releaseDateParsed =
      firebase.firestore.Timestamp.fromDate(releaseDateTemp);

    const actors = [
      mainActor ? mainActor.current.value : null,
      coMainActor ? coMainActor.current.value : null,
      thirdActor ? thirdActor.current.value : null,
      fourthActor ? fourthActor.current.value : null,
      ...otherActors.current.value.split(", "),
    ];

    const duration = durationTime.current.value;
    let priceToSend = 0;
    if (duration < 120) priceToSend = 200;
    else if (120 < duration && duration < 150) priceToSend = 250;
    else priceToSend = 300;

    const movieToSend = {
      title: title.current.value,
      director: director.current.value,
      genre: Array.from(genre.current.selectedOptions).map((opt) => opt.value),
      durationTime: duration,
      poster: poster.current.value,
      image: image.current.value,
      trailer: trailer.current.value,
      description: description.current.value,
      actors: actors.filter((a) => !!a),
      projections: [],
      reviews: [],
      releaseDate: releaseDateParsed,
      price: priceToSend,
      rating: Math.floor(Math.random() * 100) / 10,
    };

    if (movieIsEdited) {
      await projectFirestore
        .collection("movies")
        .doc(movieId)
        .update({
          title: title.current.value,
          director: director.current.value,
          genre: Array.from(genre.current.selectedOptions).map(
            (opt) => opt.value
          ),
          durationTime: duration,
          poster: poster.current.value,
          image: image.current.value,
          trailer: trailer.current.value,
          description: description.current.value,
          actors: actors.filter((a) => !!a),
          releaseDate: releaseDateParsed,
          price: priceToSend,
        });
      navigate("/admin/movies");
    } else {
      try {
        await projectFirestore.collection("movies").add(movieToSend);
        navigate("/admin/movies");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={classes.outer}>
        <div className={classes.container}>
          <h1 className={classes.text}>
            {movieIsEdited ? "Edit movie" : "Add a new movie"}
          </h1>
          <Form action="#" onSubmit={handleSubmit}>
            <div className={classes.form_row}>
              {/* {poster.current && poster.current.value && (
                <div className={classes.input_data} style={{ width: "10rem" }}>
                  <img
                    height="150"
                    alt="Poster picture"
                    src={poster.current.value}
                  />
                </div>
              )} */}
              <div className={classes.input_data}>
                <input
                  type="text"
                  required
                  ref={title}
                  defaultValue={movie ? movie.title : ""}
                  // onChange={(e) => setTitle(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Movie title</label>
              </div>
              <div className={classes.input_data}>
                <input
                  type="text"
                  required
                  ref={director}
                  defaultValue={movie ? movie.director : ""}
                  // onChange={(e) => setDirector(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Director</label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <select
                  ref={genre}
                  defaultValue={movie ? movie.genre : []}
                  multiple={true}
                >
                  <option value="Comedy">Comedy</option>
                  <option value="Horror">Horror</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Action">Action</option>
                  <option value="Drama">Drama</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Other">Other</option>
                </select>
                <div className={classes.underline}></div>
                <label htmlFor="">Genre</label>
              </div>
              <div className={classes.input_data}>
                <input
                  type="number"
                  required
                  min="0"
                  ref={durationTime}
                  defaultValue={movie ? movie.durationTime : ""}
                  // onChange={(e) => setDurationTime(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Duration time</label>
              </div>
              <div className={classes.input_data}>
                <input
                  type="date"
                  required
                  ref={releaseDate}
                  defaultValue={releaseDateString}
                  // onChange={(e) => setDurationTime(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label>Release Date</label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <input
                  type="text"
                  required
                  ref={mainActor}
                  defaultValue={movie && movie.actors ? movie.actors[0] : ""}
                  // onChange={(e) => setTitle(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Main Actor</label>
              </div>
              <div className={classes.input_data}>
                <input
                  type="text"
                  ref={coMainActor}
                  defaultValue={movie && movie.actors ? movie.actors[1] : ""}
                  // onChange={(e) => setDirector(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Co-main Actor</label>
              </div>
              <div className={classes.input_data}>
                <input
                  type="text"
                  ref={thirdActor}
                  defaultValue={movie && movie.actors ? movie.actors[2] : ""}
                  // onChange={(e) => setDirector(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">3rd Actor</label>
              </div>
              <div className={classes.input_data}>
                <input
                  type="text"
                  ref={fourthActor}
                  defaultValue={movie && movie.actors ? movie.actors[3] : ""}
                  // onChange={(e) => setDirector(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">4th Actor</label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <input
                  type="text"
                  ref={otherActors}
                  defaultValue={
                    movie && movie.actors
                      ? movie.actors.slice(4).join(", ")
                      : ""
                  }
                  // onChange={(e) => setTitle(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">
                  Other Actors (separated by commas and a blank space ", ")
                </label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <input
                  type="text"
                  ref={poster}
                  defaultValue={movie ? movie.poster : ""}
                  // onChange={(e) => setPoster(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Image URL</label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <input
                  type="text"
                  ref={image}
                  defaultValue={movie ? movie.image : ""}
                  // onChange={(e) => setPoster(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Poster URL</label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <input
                  type="text"
                  required
                  ref={trailer}
                  defaultValue={movie ? movie.trailer : ""}
                  // onChange={(e) => setTrailer(e.target.value)}
                />
                <div className={classes.underline}></div>
                <label htmlFor="">Trailer URL</label>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <div className={classes.textarea}>
                  <textarea
                    required
                    ref={description}
                    defaultValue={movie ? movie.description : ""}
                    // onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className={classes.underline}></div>
                  <label htmlFor="">Description</label>
                </div>
              </div>
            </div>
            <div className={classes.form_row}>
              <div className={classes.input_data}>
                <div className={classes.submit_btn}>
                  <div className={classes.input_data}>
                    <div className={classes.inner}></div>
                    <input
                      type="submit"
                      value={movieIsEdited ? "Edit" : "Add"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
          {/* <button onClick={handleAddHall}>Add New Hall</button> */}
        </div>
      </div>
    </>
  );
}

export default AddNewMovie;
