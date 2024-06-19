import { FaBookmark, FaShareAltSquare } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import classes from "./CinemaDetails.module.css";

function CinemaDetails() {
  return (
    <div
      className="flex-grow-1 text-white p-5"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div
        className="container w-75 border-bottom pb-4"
        style={{ color: "var(--color-primary)" }}
      >
        <h1
          className={classes.heading + " text-left ps-2"}
          style={{ color: "var(--color-primary)" }}
        >
          About Us
        </h1>
      </div>
      <div className={classes.mainDiv + " container rounded bg-dark mt-4"}>
        <section id="about-us" className={classes.mainText + " p-4"}>
          <h1>
            Welcome to <strong>Kinoteka</strong> – Your Ultimate Cinematic
            Experience!
          </h1>
          <br />
          <p>
            At Kinoteka, we bring the magic of movies to life. As a new brand on
            the market, we are dedicated to providing a top-notch movie-going
            experience. Our state-of-the-art cinema boasts three modern cinema
            halls, each designed to immerse you in the world of film with the
            latest in projection and sound technology.
          </p>
          <h2>What We Offer:</h2>
          <ul style={{ listStyle: "none" }}>
            <li>
              <span className="fs-3" style={{ color: "var(--color-third)" }}>
                <MdMovieFilter />
              </span>{" "}
              <strong>Latest Releases:</strong> Catch all the newest movie
              projections, from Hollywood blockbusters to independent gems.
            </li>
            <li>
              <span className="fs-3" style={{ color: "var(--color-third)" }}>
                <FaBookmark />
              </span>{" "}
              <strong> Advanced Booking:</strong> Browse our movie schedule,
              search for your favorite films, and easily reserve your tickets
              online.
            </li>
            <li>
              <span className="fs-3" style={{ color: "var(--color-third)" }}>
                <FaShareAltSquare />
              </span>{" "}
              <strong>Interactive Experience:</strong> Share your thoughts by
              leaving comments and ratings for the movies you've seen, and join
              our community of movie enthusiasts.
            </li>
          </ul>
          <p>
            At Kinoteka, we are passionate about movies and strive to create a
            welcoming environment where every visit is a memorable event.
            Whether you're a casual viewer or a dedicated cinephile, our aim is
            to make every screening special.
          </p>
          <p>
            Join us at Kinoteka – where stories come to life on the big screen.
          </p>
          <p>
            Feel free to explore our website and start your cinematic journey
            with us today!
          </p>
        </section>
      </div>
    </div>
  );
}

export default CinemaDetails;
