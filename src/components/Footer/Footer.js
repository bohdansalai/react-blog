import React from "react";
import styles from "./Footer.module.css";
export const Footer = ({ year }) => {
  return (
    <footer>
      <span>{year}</span>
      <button className={styles.btn}>Click here</button>
    </footer>
  );
};
