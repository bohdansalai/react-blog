import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {
  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <header>
      {isLoggedIn ? (
        <nav>
          Welcome, {userName}
          <NavLink
            onClick={handleLogOut}
            className={({ isActive }) => (isActive ? styles.activeLink : "")}
            to="/login"
          >
            <FontAwesomeIcon icon={faSignOut} /> Log out
          </NavLink>
        </nav>
      ) : (
        "Hi you"
      )}
    </header>
  );
};
