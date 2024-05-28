// import { useState } from "react";
// import { GrNext, GrPrevious } from "react-icons/gr";
// import classes from "./Carousel.module.css";

// function Carousel({ images }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   // let intervalTime = 2000;

//   function prevSlide() {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   }

//   function nextSlide() {
//     setActiveIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   }

//   // const timer = setInterval(() => {
//   //   nextSlide();
//   // }, intervalTime);

//   return (
//     <div className={classes.carousel_container}>
//       <div className={classes.carousel}>
//         <div
//           onClick={() => {
//             // clearInterval(timer);
//             prevSlide();
//           }}
//           className={classes.carousel_btn_prev}
//         >
//           <div>
//             <GrPrevious className={classes.carousel_btn_icon} />
//           </div>
//         </div>
//         <img
//           src={images[activeIndex]}
//           className={classes.carousel_img}
//           alt={`Slide ${activeIndex}`}
//         ></img>
//         <div
//           onClick={() => {
//             // clearInterval(timer);
//             nextSlide();
//           }}
//           className={classes.carousel_btn_next}
//         >
//           <div>
//             <GrNext className={classes.carousel_btn_icon} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Carousel;

import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";

function CarouselComponent({ images }) {
  return (
    <Carousel>
      <Carousel.Item interval={3000} style={{ height: "25rem" }}>
        <ExampleCarouselImage image={images[0]} text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} style={{ height: "25rem" }}>
        <ExampleCarouselImage image={images[1]} text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} style={{ height: "25rem" }}>
        <ExampleCarouselImage image={images[2]} text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
