import classes from "./Gallery.module.css";
import { Link } from "react-router-dom";

function Gallery({ movies }) {
  return (
    <>
      <div className={classes.gallery}>
        <h1>Top picks</h1>
        <div className={classes.gallery_images}>
          <div className={classes.row}>
            <div className={classes.group}>
              <Link to={`/movies/${movies[0].id}`}>
                <img src={movies[0].poster} alt={movies[0].description}></img>
              </Link>
            </div>
            <div className={classes.group}>
              <div>
                <div className={classes.group_m}>
                  <Link to={`/movies/${movies[1].id}`}>
                    <img
                      src={movies[1].poster}
                      alt={movies[1].description}
                    ></img>
                  </Link>
                </div>
                <div className={classes.group_m}>
                  <Link to={`/movies/${movies[1].id}`}>
                    <img
                      src={movies[1].poster}
                      alt={movies[1].description}
                    ></img>
                  </Link>
                </div>
              </div>
              <div className={classes.group_m}>
                <Link to={`/movies/${movies[1].id}`}>
                  <img src={movies[1].poster} alt={movies[1].description}></img>
                </Link>
              </div>
              <div className={classes.group_m}>
                <Link to={`/movies/${movies[1].id}`}>
                  <img src={movies[1].poster} alt={movies[1].description}></img>
                </Link>
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.group}>
              <div>
                <div className={classes.group_m}>
                  <Link to={`/movies/${movies[1].id}`}>
                    <img
                      src={movies[1].poster}
                      alt={movies[1].description}
                    ></img>
                  </Link>
                </div>
                <div className={classes.group_m}>
                  <Link to={`/movies/${movies[1].id}`}>
                    <img
                      src={movies[1].poster}
                      alt={movies[1].description}
                    ></img>
                  </Link>
                </div>
              </div>
              <div className={classes.group_m}>
                <Link to={`/movies/${movies[1].id}`}>
                  <img src={movies[1].poster} alt={movies[1].description}></img>
                </Link>
              </div>
              <div className={classes.group_m}>
                <Link to={`/movies/${movies[1].id}`}>
                  <img src={movies[1].poster} alt={movies[1].description}></img>
                </Link>
              </div>
            </div>
            <div className={classes.group}>
              <Link to={`/movies/${movies[0].id}`}>
                <img src={movies[0].poster} alt={movies[0].description}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
