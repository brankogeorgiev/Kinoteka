import Carousel from "../components/Carousel";
import Gallery from "../components/Gallery";

function MainContent(props) {
  const images = [
    "https://i0.wp.com/thetechnovore.com/wp-content/uploads/2019/04/D40BuNcWAAEVP4r.jpg?fit=1200%2C503&ssl=1",
    "https://i.ytimg.com/vi/D58KIfFMJ9Y/maxresdefault.jpg",
    "https://media.assettype.com/film-companion/import/wp-content/uploads/2021/08/AEE1E04D-C382-4B97-8D11-03028E182A31.jpeg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
  ];

  return (
    <div>
      <Carousel images={images} />
      <Gallery movies={props.movies} />
    </div>
  );
}

export default MainContent;
