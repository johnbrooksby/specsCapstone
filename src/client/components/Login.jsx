import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const Body = {
      username,
      password,
    };

    axios
      .post(register ? "/register" : "/login", Body)
      .then((res) => {
        console.log(res.data);
        setRegister(res)
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        setUsername('')
        setPassword('')

      })
      .catch((err) => {
        console.error(err);
        setUsername("");
        setPassword("");
      });

    console.log("submitHandler called");
  };

  return (
    <main>
      {/* <h1>Welcome!</h1> */}
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button className="form-btn" >{register ? "Sign Up" : "Login"} </button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Login;
