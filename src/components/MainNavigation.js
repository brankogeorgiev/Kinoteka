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
          <li className={classes.navBtns}>
            <div>
              <NavLink to="/movies" className={classes.list_item}>
                In Cinema
              </NavLink>
              <NavLink to="/coming-soon" className={classes.list_item}>
                Coming Soon
              </NavLink>
              <NavLink to="/cinema-details" className={classes.list_item}>
                Cinema Details
              </NavLink>
              {token && (
                <NavLink to="/profile" className={classes.list_item}>
                  My Profile
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/admin/movies" className={classes.list_item}>
                  Admin Page
                </NavLink>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
