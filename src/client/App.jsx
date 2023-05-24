import { useState, useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import "./App.css";

import Header from './components/Header'
import Navbar from "./components/Navbar";
import Welcome from './components/Welcome';
import CompThree from "./components/CompThree";
import CompFour from "./components/CompFour";
import AuthContext from './store/authContext';
import Home from "./components/Home";
import Login from "./components/Login";
import Testimonials from "./components/Testimonials";
import About from "./components/About";


function App() {
  const [count, setCount] = useState(0);
  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  );
}

export default App;
