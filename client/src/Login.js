import axios from "axios";
import React, { useState } from "react";
import Home from "./Home";
import "./Login.css";
import Header from "./Header";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState(false);

  async function logIn() {
    let data = { email, password };
    axios.post("http://localhost:5000/checkUser", data).then((res) => {
      console.log("res :", res.data);
      setLoginResult(res.data[0]);
      if (res.data[0] == false) alert("Invalid credentials!!!");
      if (res.data[0]) {
        axios
          .post("http://localhost:5000/addLoginInfo", res.data[1])
          .then((res) => {
            console.log("login info added :", res.data);
          });
      }
    });
  }
  function register() {}
  if (loginResult) return <Home />;
  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1>Log-in</h1>

          <div className="formDiv">
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

            <button
              type="submit"
              onClick={logIn}
              className="login__signInButton"
            >
              Log In
            </button>
          </div>

          <a href="/signIn">
            <button onClick={register} className="login__registerButton">
              Create your Lavish Account
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
