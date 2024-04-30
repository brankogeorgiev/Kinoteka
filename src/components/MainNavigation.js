import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "../items/logo.png";
import { useState } from "react";

function MainNavigation() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={classes.list_item}>
              <img src={logo} className={classes.logo} />
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
              {loggedIn && (
                <NavLink to="/" className={classes.list_item}>
                  My Profile
                </NavLink>
              )}
              {loggedIn && (
                <NavLink to="/admin/movies" className={classes.list_item}>
                  Admin Page
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/halls" className={classes.list_item}>
                  Halls
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
