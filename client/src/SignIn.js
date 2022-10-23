import React, { useEffect, useState } from "react";

import Select from "react-select";
import "./SignIn.css";
import axios from "axios";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
function SignIn({ id, title, image, price, rating }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loginResult, setLoginResult] = useState(false);

  function signIn() {
    console.log("email :", email);
    console.log("passwoord :", password);
    console.log("name :", name);
    console.log("type:", type);
    let data = { name, email, password, type };
    axios.post("http://localhost:5000/addUser", data).then((res) => {
      console.log("received data :", res.data);
      localStorage.setItem("isLogin", res.data[0]);

      if (res.data[0]) {
        alert("Created Successfully");
        localStorage.setItem("userDetails", res.data[1]);
      } else alert("Error!!!");
      setLoginResult(res.data[0]);
    });
  }

  if (loginResult) return <Home />;
  return (
    <div className="login">
      <div className="login__container">
        <h1>Create Account</h1>

        <div className="formDiv">
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="type">
            <input
              type="radio"
              id="Admin"
              name="drone"
              value="Admin"
              className="checkboxInput"
              onChange={(e) => setType(e.target.value)}
            />
            <label for="Admin">Admin</label>
          </div>
          <div className="type">
            <input
              type="radio"
              id="General"
              name="drone"
              value="General"
              className="checkboxInput"
              onChange={(e) => setType(e.target.value)}
            />
            <label for="General">General</label>
          </div>
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Submit
          </button>
        </div>

        <a href="/login">
          <button className="login__registerButton">
            Already have an account? Log In
          </button>
        </a>
      </div>
    </div>
  );
}

export default SignIn;
