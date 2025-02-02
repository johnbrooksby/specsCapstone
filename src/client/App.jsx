import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AuthContext from "./store/authContext";
import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
import Home from "./components/homeScreen/Home";
import Login from "./components/Login";
import Testimonials from "./components/testimonials/Testimonials";
import Account from "./components/Account";
import Footer from "./components/footer/Footer";
import Admin from "./components/admin/Admin";
import ClientProfile from "./components/admin/clientprofile/ClientProfile";
import Billing from "./components/admin/Billing";

function App() {
  const authCtx = useContext(AuthContext);
  const [headerScroll, setHeaderScroll] = useState(false);

  useEffect(() => {
    authCtx.setAdmin(localStorage.getItem("admin"));
  }, [authCtx.token]);

  // let profile = authCtx.admin && (authCtx.refered ? authCtx.clientId : authCtx.userId)

  return (
    <div className="App">
    {/* window.onScroll={(event) => {setHeaderScroll(true)}} */}
      <div className={headerScroll ? "header-container header-light" : "header-container"}>
      {/* {console.log(headerScroll)} */}
        {/* <Header headerScroll={headerScroll} />
        <Navbar headerScroll={headerScroll} /> */}
        <Header />
        <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="login"
            element={!authCtx.token ? <Login /> : <Navigate to="/" />}
          />
          <Route path="testimonials" element={<Testimonials />} />
          <Route
            path="admin"
            element={
              authCtx.admin || localStorage.getItem("admin") ? (
                <Admin />
              ) : (
                <Navigate to="/" />
              )
            }
            />
          <Route
            path="admin/billing"
            element={
              authCtx.admin || localStorage.getItem("admin") ? (
                <Billing />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="admin/clientprofile/client"
            element={
              !authCtx.token ? (
                <Login />
              ) : (
                <ClientProfile
                // id={profile}
                />
              )
            }
          />
          <Route
            path="account"
            element={authCtx.token ? <Account /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
