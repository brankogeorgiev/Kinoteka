import { Link } from "react-router-dom";

function Halls({ halls }) {
  return (
    <div>
      {halls
        ? halls.map((hall) => <div key={hall.id}>{hall.name}</div>)
        : "Loading..."}
      <button>
        <Link to="/admin/add-movie-projection">Add new movie</Link>
      </button>
    </div>
  );
}

export default Halls;
