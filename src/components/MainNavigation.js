import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../items/logo.png";
import { useState } from "react";

function MainNavigation() {
  const [loggedIn, setLoggedIn] = useState(true);
  const { token, role } = useRouteLoaderData("root");
  const isAdmin = role === "ROLE_ADMIN";

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={classes.list_item}>
              <img src={logo} className={classes.logo} alt="Logo" />
            </NavLink>
          </li>
          <li>
            <div>
              <NavLink to="/movies" className={classes.list_item}>
                In Cinema
              </NavLink>
              <NavLink to="/" className={classes.list_item}>
                Coming Soon
              </NavLink>
              <NavLink to="/" className={classes.list_item}>
                Cinema Details
              </NavLink>
              {token && (
                <NavLink to="/" className={classes.list_item}>
                  My Profile
                </NavLink>
              )}
              {token && (
                <NavLink
                  to="/profile/favorite-movies"
                  className={classes.list_item}
                >
                  Favourites
                </NavLink>
              )}
              {token && (
                <NavLink
                  to="/profile/my-reservations"
                  className={classes.list_item}
                >
                  My Tickets
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/admin/movies" className={classes.list_item}>
                  Admin Page
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/halls" className={classes.list_item}>
                  Halls
                </NavLink>
              )}
              {token && (
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
