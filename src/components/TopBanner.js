import { Form, NavLink, useNavigate } from "react-router-dom";
import classes from "./TopBanner.module.css";
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";

function TopBanner() {
  const navigate = useNavigate();

  function searchIconHandler() {
    navigate("/search");
  }

  return (
    <section className={classes.upper_section}>
      <ul>
        <li className={classes.input_logo}>
          <div className={classes.icon}>
            <Form method="post">
              <IoSearch
                className={classes.searchIcon}
                onClick={searchIconHandler}
              />
            </Form>
          </div>
        </li>
        <li>
          <NavLink to="/auth?type=login">
            <IoPersonCircleOutline className={classes.person} />
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default TopBanner;
