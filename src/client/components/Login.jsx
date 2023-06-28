import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email_address, setEmail] = useState("");
  const [street_address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (register && (password !== verifyPassword)){
      alert('Passwords do not match')
      return;
    }

    const Body = {
      username,
      password,
    };

    const RegBody = {
      username,
      name,
      password,
      street_address,
      city,
      state,
      zip,
      email_address,
    };

    axios
      .post(register ? "/register" : "/login", register ? RegBody : Body)
      .then((res) => {
        console.log("res.data", res.data.admin);
        setRegister(res);
        authCtx.setAdmin(res.data.admin)
        authCtx.login(res.data.token, res.data.exp, res.data.userId, res.data.admin);
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
        setLogin(false);
      });

    console.log("submitHandler called");
  };

  return (
    <main className="page">
      {!register ? (
        <form className="form auth-form" onSubmit={submitHandler}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
            autoFocus
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          {!login && (
            <p className="badlogin">Username and/or password incorrect</p>
          )}
          <button className="orange-btn">
            {register ? "Create Account" : "Login"}{" "}
          </button>
        </form>
      ) : (
        <form className="form reg-form" onSubmit={submitHandler}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="reg-form-input"
            required
            autoFocus
          />
          <input
            placeholder="First & Last Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="Verify Password"
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="Street Address"
            value={street_address}
            onChange={(e) => setAddress(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="reg-form-input"
            required
          />
          <input
            placeholder="Email Address"
            type="email"
            value={email_address}
            onChange={(e) => setEmail(e.target.value)}
            className="reg-form-input email"
          />
          <div>
            <button className="orange-btn">
              {register ? "Create Account" : "Login"}{" "}
            </button>
          </div>
        </form>
      )}
      <button className="inactive-btn" onClick={() => {
        setRegister(!register)
        setLogin('')
        setPassword('')
      }
      }>
        Need to {register ? "Login" : "Create an Account"}?
      </button>
    </main>
  );
};

export default Login;
