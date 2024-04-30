import { Form, NavLink } from "react-router-dom";
import classes from "./TopBanner.module.css";
import { IoPersonCircleOutline, IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

function TopBanner() {
  const [searchInput, setSearchInput] = useState(false);

  function searchIconHandler() {
    if (!searchInput) {
      setSearchInput(true);
    } else {
      console.log("Submit");
    }
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      setSearchInput(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <section className={classes.upper_section}>
      <ul>
        <li className={classes.input_logo}>
          <div className={classes.icon}>
            <Form method="post">
              {searchInput && (
                <input
                  className={classes.searchBar}
                  placeholder="Search... (Press esc to close)"
                />
              )}
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
