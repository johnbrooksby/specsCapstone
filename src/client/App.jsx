import { useState, useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import "./App.css";

import Header from './components/Header'
import Navbar from "./components/Navbar";
import AuthContext from './store/authContext';
import Home from "./components/Home";
import Login from "./components/Login";
import Testimonials from "./components/Testimonials";
import Account from "./components/Account";


function App() {
  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={!authCtx.token ? <Login /> : <Navigate to='/' />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="about" element={authCtx.token ? <Account /> : <Navigate to='/' />} />
        {/* <Route path="account" element={authCtx.token ? <Account /> : <Navigate to='/' />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  );
}

export default App;
