import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";
// import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <div>
      {/* <ul className={styles.navbar}> */}
      <nav className="navbar">
        <ul className="navUl">
          {/* <li className={styles.li}> */}
          <li className="li">
            <NavLink to="/">Home</NavLink>
          </li>
          {/* <li className={styles.li}> */}
          <li className="li">
            <NavLink to="login">Login</NavLink>
          </li>
          {/* <li className={styles.li}> */}
          <li className="li">
            <NavLink to="testimonials">Testimonials</NavLink>
          </li>
          {/* <li className={styles.li}> */}
          <li className="li">
            <NavLink to="about">About</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
