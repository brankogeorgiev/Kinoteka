import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import { useNavigate } from "react-router-dom";
import classes from "./Carousel.module.css";

function CarouselComponent({ movies }) {
  const navigate = useNavigate();

  function handleCarouselItemClick(movie) {
    navigate(`/movies/${movie.id}`);
  }

  return (
    <Carousel
      className="m-auto d-inline-block"
      style={{ width: "80%", margin: "auto" }}
    >
      {movies.map((mov) => (
        <Carousel.Item
          key={mov.id}
          className={classes.carousel_item}
          onClick={() => {
            handleCarouselItemClick(mov);
          }}
          interval={3000}
          style={{ height: "25rem" }}
        >
          <ExampleCarouselImage image={mov.image} text="First slide" />
          <Carousel.Caption>
            <h3>{mov.title}</h3>
            <p>{mov.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
