import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import Carousel from "../components/Carousel";
import Gallery from "../components/Gallery";

function MainContent(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    let results = [];
    await projectFirestore
      .collection("movies")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
        }
      });
    const resultsFiltered = results.filter((res) => res.image !== undefined);
    setMovies(resultsFiltered);
  }

  return (
    <div className="text-center">
      {movies && <Carousel movies={movies} />}
      <Gallery movies={props.movies} />
    </div>
  );
}

export default MainContent;
