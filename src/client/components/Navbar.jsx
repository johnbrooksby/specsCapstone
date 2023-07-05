import React, {useContext, useEffect} from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    {localStorage.getItem("admin") && authCtx.setAdmin(JSON.parse(localStorage.getItem("admin")))}
  }, [authCtx.login])


  return (
    <div>
      <nav className="navbar">
        {authCtx.token ? (
          <ul className="navUl">
            <li className="li">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="li">
              <NavLink to="testimonials">Testimonials</NavLink>
            </li>
            <li className="li">
              {authCtx.admin ? <NavLink to="admin">Admin</NavLink> : <NavLink to="account">Account</NavLink>}
            </li>
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
