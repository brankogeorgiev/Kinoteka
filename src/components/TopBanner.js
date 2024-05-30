import {
  Form,
  Link,
  NavLink,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import classes from "./TopBanner.module.css";
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosExit } from "react-icons/io";

function TopBanner() {
  const navigate = useNavigate();
  const { token, email } = useRouteLoaderData("root");

  function searchIconHandler() {
    navigate("/search");
  }

  return (
    <section className={classes.upper_section}>
      <ul className="px-5" style={{ height: "2.5rem" }}>
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
          {token && (
            <span>
              <Link
                className="text-decoration-none"
                style={{ color: "inherit" }}
                to={"/profile"}
              >
                <BsFillPersonFill className="fs-5" /> Hello {email}{" "}
              </Link>
            </span>
          )}
        </li>
        {token && (
          <Form action="/logout" method="post">
            <button
              className="fw-bold"
              style={{ border: "none", backgroundColor: "inherit" }}
            >
              Logout <IoIosExit className="fs-5" />
            </button>
          </Form>
        )}
      </ul>
    </section>
  );
}

export default TopBanner;
