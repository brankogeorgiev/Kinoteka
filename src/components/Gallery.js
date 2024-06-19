import classes from "./Gallery.module.css";
import { Link } from "react-router-dom";

function Gallery({ movies }) {
  const topTenMovies = movies.slice(0, 10);

  return (
    <>
      <div className={classes.gallery}>
        <h1>Top picks</h1>
        <div className="container-fluid w-75">
          <div className="row">
            <div className={classes.bigImgDiv + " col-6"}>
              <Link to={`/movies/${topTenMovies[0].id}`}>
                <img
                  width="100%"
                  src={topTenMovies[0].poster}
                  alt={`${topTenMovies[0].title} poster`}
                />
              </Link>
            </div>
            <div className={classes.smallImgDiv + " col-6"}>
              <div className="row">
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[1].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[1].poster}
                      alt={`${topTenMovies[1].title} poster`}
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[2].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[2].poster}
                      alt={`${topTenMovies[2].title} poster`}
                    />
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[3].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[3].poster}
                      alt={`${topTenMovies[3].title} poster`}
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[4].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[4].poster}
                      alt={`${topTenMovies[4].title} poster`}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={classes.smallImgDiv + " col-6"}>
              <div className="row">
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[5].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[5].poster}
                      alt={`${topTenMovies[5].title} poster`}
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[6].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[6].poster}
                      alt={`${topTenMovies[6].title} poster`}
                    />
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[7].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[7].poster}
                      alt={`${topTenMovies[7].title} poster`}
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={`/movies/${topTenMovies[8].id}`}>
                    <img
                      width="100%"
                      src={topTenMovies[8].poster}
                      alt={`${topTenMovies[8].title} poster`}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className={classes.bigImgDiv + " col-6"}>
              <Link to={`/movies/${topTenMovies[9].id}`}>
                <img
                  width="100%"
                  src={topTenMovies[9].poster}
                  alt={`${topTenMovies[9].title} poster`}
                />
              </Link>
            </div>
          </div>
        </div>
        {/* <div className={classes.gallery_images}>
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
        </div> */}
      </div>
    </>
  );
}

export default Gallery;
