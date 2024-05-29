import {
  Form,
  NavLink,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import classes from "./TopBanner.module.css";
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";

function TopBanner() {
  const navigate = useNavigate();
  const { token, email } = useRouteLoaderData("root");

  function searchIconHandler() {
    navigate("/search");
  }

  return (
    <section className={classes.upper_section}>
      <ul style={{ height: "2.5rem" }}>
        <li className={classes.input_logo}>
          <div className={classes.icon}>
            <IoSearch
              className={classes.searchIcon}
              onClick={searchIconHandler}
            />
          </div>
        </li>
        <li>
          {!token && (
            <NavLink to="/auth?type=login">
              <IoPersonCircleOutline className={classes.person} />
            </NavLink>
          )}
          {token && <span>Hello {email}</span>}
        </li>
        {token && (
          <Form action="/logout" method="post">
            <button>Logout</button>
          </Form>
        )}
      </ul>
    </section>
  );
}

export default TopBanner;
