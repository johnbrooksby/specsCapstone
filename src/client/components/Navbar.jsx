import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      {/* <ul className={styles.navbar}> */}
      <nav className="navbar">
        {authCtx.token ? (
          <ul className="navUl">
            {/* <li className={styles.li}> */}
            <li className="li">
              <NavLink to="/">Home</NavLink>
            </li>
            {/* <li className={styles.li}> */}
            <li className="li">
              <NavLink to="testimonials">Testimonials</NavLink>
            </li>
            {/* <li className={styles.li}> */}
            <li className="li">
              <NavLink to="about">About</NavLink>
            </li>
            {/* <li className={styles.li}> */}
            <li className="li">
            <a onClick={() => authCtx.logout()}>Logout</a>
            </li>
          </ul>
        ) : (
          <ul className="navUl">
            <li  className="li">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="li">
              <NavLink to="testimonials">Testimonials</NavLink>
            </li>
            <li className="li">
              <NavLink to="about">About</NavLink>
            </li>
            <li  className="li">
              <NavLink to="login">Login or Sign Up</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
