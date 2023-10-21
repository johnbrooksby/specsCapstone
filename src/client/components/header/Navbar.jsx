import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    {
      localStorage.getItem("admin") &&
        authCtx.setAdmin(JSON.parse(localStorage.getItem("admin")));
    }
  }, [authCtx.login]);

  return (
    <div>
      <nav className="navbar">
        {authCtx.token ? (
          <ul className="navUl">
            {/* <li className={!admin ? "li drop_one_pixel" : "li"}> */}
            <li className="li">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="li">
              <NavLink to="testimonials">Testimonials</NavLink>
            </li>
            <li className="li">
              {/* {authCtx.admin ? <NavLink to="clientinfo/adminUser">Account</NavLink> : <NavLink to="account">Account</NavLink>} */}
              <NavLink to="account">Account</NavLink>
            </li>
            {authCtx.admin && <li className="li">
              {/* {authCtx.admin ? <NavLink to="admin">Admin</NavLink> : <NavLink to="account">Account</NavLink>} */}
              <NavLink to="admin">Admin</NavLink>
            </li>}
            <li className="li">
              <a
                onClick={() => {
                  navigate("/");
                  authCtx.logout();
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navUl">
            <li className="li">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="li">
              <NavLink to="testimonials">Testimonials</NavLink>
            </li>
            <li className="li">
              {/* <NavLink to="login">Login or Sign Up</NavLink> */}
              <NavLink to="login">Login / Register</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
