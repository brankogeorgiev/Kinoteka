import classes from "./LoginForm.module.css";
import { projectFirestore } from "../firebase/config.js";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

function AddNewMovie({ movie, movieIsEdited }) {
  // const [showList, setShowList] = useState(false);
  // const [foundMovies, setFoundMovies] = useState([]);
  // const [allMovies, setAllMovies] = useState([]);
  // const [posterImage, setPosterImage] = useState("");
  // const searchMovie = useRef();
  const title = useRef();
  const director = useRef();
  const genre = useRef();
  const durationTime = useRef();
  const poster = useRef();
  const trailer = useRef();
  const description = useRef();
  const mainActor = useRef();
  const coMainActor = useRef();
  const thirdActor = useRef();
  const fourthActor = useRef();
  const otherActors = useRef();
  const navigate = useNavigate();
  const { movieId } = useParams();

  // !!!!!!
  // let temp = ["Actor 1", "Actor 2", "Actor 3", null, undefined];
  // console.log(temp.filter((a) => !!a).join(", "));

  // const getMovieRequest = async (title) => {
  //   const url = `http://www.omdbapi.com/?apikey=a23377fa&s=${title}`;
  //   const response = await fetch(url);
  //   const responseJson = await response.json();
  //   setFoundMovies(responseJson.Search);

  //   const url = "https://imdb-top-100-movies.p.rapidapi.com/";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "4050ac13b7msh3f918726f575273p162423jsnf3b9e54e246d",
  //       "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  //       "X-RapidAPI-Key": "2955d96859msh0d9ee98f60560d9p1d0645jsnd52a980b9241",
  //       "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     setAllMovies(result);
  //     const response = await fetch(url);
  //     const responseJson = await response.json();
  //     setAllMovies(responseJson.Search);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // function handleMovieSearch(e) {
  //   const value = e.target.value;
  //   if (value.length >= 3) {
  //     console.log(allMovies);
  //     getMovieRequest(value);
  //     setFoundMovies(
  //       allMovies.filter((m) =>
  //         m.Title.toLowerCase().includes(value.toLowerCase())
  //       )
  //     );
  //   }
  // }

  // function handleClick(m) {
  //   console.log(m);
  //   title.current.value = m.Title;
  //   poster.current.value = m.Poster;
  //   description.current.value = m.description;
  //   searchMovie.current.value = m.Title;

  //   const selectedGenres = Array.isArray(m.genre) ? m.genre : [m.genre];
  //   const genreOptions = genre.current.options;
  //   let genreOptionsList = [];

  //   for (let i = 0; i < genreOptions.length; i++) {
  //     genreOptionsList.push(genreOptions[i].value);
  //   }

  //   for (let j = 0; j < selectedGenres.lenght; j++) {
  //     console.log(selectedGenres[j]);
  //   }

  //   for (let i = 0; i < genreOptions.length; i++) {
  //     if (selectedGenres.includes(genreOptions[i].value)) {
  //       genreOptions[i].selected = true;
  //     } else {
  //       genreOptions[i].selected = false;
  //     }
  //   }

  //   setPosterImage(m.Poster);
  //   setShowList(false);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actors = [
      mainActor ? mainActor.current.value : null,
      coMainActor ? coMainActor.current.value : null,
      thirdActor ? thirdActor.current.value : null,
      fourthActor ? fourthActor.current.value : null,
      ...otherActors.current.value.split(", "),
    ];

    const movieToSend = {
      title: title.current.value,
      director: director.current.value,
      genre: Array.from(genre.current.selectedOptions).map((opt) => opt.value),
      durationTime: durationTime.current.value,
      poster: poster.current.value,
      trailer: trailer.current.value,
      description: description.current.value,
      actors: actors.filter((a) => !!a),
      projections: [],
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
          durationTime: durationTime.current.value,
          poster: poster.current.value,
          trailer: trailer.current.value,
          description: description.current.value,
          actors: actors.filter((a) => !!a),
        });
      navigate("/admin/movies");
    } else {
      console.log("Adding");
      try {
        await projectFirestore.collection("movies").add(movieToSend);
        navigate("/admin/movies");
      } catch (err) {
        console.log(err);
      }
    }
  };

  async function handleAddHall() {
    try {
      await projectFirestore
        .collection("halls")
        .doc("hall3")
        .set({
          name: "Hall 3",
          rows: [
            {
              row: 1,
              seats: [
                { seat: 1, reserved: false },
                { seat: 2, reserved: false },
                { seat: 3, reserved: false },
                { seat: 4, reserved: false },
                { seat: 5, reserved: false },
              ],
            },
            {
              row: 2,
              seats: [
                { seat: 1, reserved: false },
                { seat: 2, reserved: false },
                { seat: 3, reserved: false },
                { seat: 4, reserved: false },
                { seat: 5, reserved: false },
              ],
            },
            {
              row: 3,
              seats: [
                { seat: 1, reserved: false },
                { seat: 2, reserved: false },
                { seat: 3, reserved: false },
                { seat: 4, reserved: false },
                { seat: 5, reserved: false },
              ],
            },
            {
              row: 4,
              seats: [
                { seat: 1, reserved: false },
                { seat: 2, reserved: false },
                { seat: 3, reserved: false },
                { seat: 4, reserved: false },
                { seat: 5, reserved: false },
              ],
            },
            {
              row: 5,
              seats: [
                { seat: 1, reserved: false },
                { seat: 2, reserved: false },
                { seat: 3, reserved: false },
                { seat: 4, reserved: false },
                { seat: 5, reserved: false },
              ],
            },
          ],
        });
      console.log("Hall added successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // function handleSearchFocus() {
  //   setShowList(true);
  // }

  // function handleSearchBlur() {
  //   setShowList(false);
  // }

  return (
    <>
      <div className={classes.outer}>
        <div className={classes.container}>
          <h1 className={classes.text}>
            {movieIsEdited ? "Edit movie" : "Add a new movie"}
          </h1>
          <Form action="#" onSubmit={handleSubmit}>
            {/* {!movieIsEdited && (
              <div className={classes.form_row}>
                <div className={classes.input_data}>
                  <input
                    type="text"
                    required
                    ref={searchMovie}
                    onChange={handleMovieSearch}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />
                  <div className={classes.underline}></div>
                  <label htmlFor="">Search for a movie...</label>
                  {showList && foundMovies && foundMovies.length && (
                    <ul className={classes.movies_list}>
                      {foundMovies.map((m) => (
                        <li onClick={() => handleClick(m)} key={m.imdbID}>
                          {m.Title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={classes.input_data}>
                  <img
                    style={{ width: "5rem", height: "auto" }}
                    src={posterImage}
                  />
                </div>
              </div>
            )} */}

            <div className={classes.form_row}>
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
          <button onClick={handleAddHall}>Add New Hall</button>
        </div>
      </div>
    </>
  );
}

export default AddNewMovie;
