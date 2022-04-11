import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <header>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to="/login"
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};
