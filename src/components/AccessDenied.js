import { GiTrafficCone } from "react-icons/gi";
import { TbError404Off } from "react-icons/tb";
import classes from "./AccessDenied.module.css";
import { useNavigate } from "react-router-dom";

function AccessDenied() {
  const navigate = useNavigate();

  function onClickRedirect() {
    navigate("/");
  }

  return (
    <div
      className="container-fluid flex-grow-1 d-flex pt-5"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="container text-white d-flex justify-content-center p-5">
        <div className={classes.page_not_found + " d-flex flex-column"}>
          <div className="text-center">
            <h3>ERROR: ACCESS DENIED</h3>
          </div>
          <div className="text-center">
            <TbError404Off className="fs-1 text-secondary" />
          </div>
          <div className="text-center">
            <GiTrafficCone className="fs-1 text-danger" />
          </div>
          <div className="text-center">
            <button className={classes.home_button} onClick={onClickRedirect}>
              BACK TO HOME PAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
