import { useContext, useEffect } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import "./App.css";

import AuthContext from './store/authContext';

import Header from './components/Header'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Testimonials from "./components/Testimonials";
import Account from "./components/Account";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import ClientProfile from "./components/clientprofile/ClientProfile";




function App() {

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    authCtx.setAdmin(localStorage.getItem("admin"))
  }, [authCtx.token])
  
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={!authCtx.token ? <Login /> : <Navigate to='/' />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="admin" element={authCtx.admin ? <Admin /> : <Navigate to='/' />} />
        <Route path="clientinfo" element={authCtx.admin ? <ClientProfile /> : <Navigate to='/' />} />
        <Route path="account" element={authCtx.token ? <Account /> : <Navigate to='/' /> } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
