import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      // const response = axios
      //   .post(
      //     "http://localhost:3000/authen",
      //     JSON.stringify({ username: username, password: password }),
      //     {
      //       headers: {
      //         "Content-Type": "application/json; charset=UTF-8",
      //         Accept: "application/json",
      //       },
      //     }
      //   )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({ username: username, password: password })
          );
          toast.success("Login successful!");
          navigate("/home");
        } else if (res.status === 401) {
          toast.error("Incorrect Username and/or Password!");
        } else {
          toast.error("Please enter Username and Password!");
        }
      });
  };

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="parent clearfix">
      <div className="bg-illustration">
        <img src="https://i.ibb.co/Pcg0Pk1/logo.png" alt="logo" />
        <div className="burger-btn">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h1>
            Login to access to
            <br />
            your account
          </h1>
          <div className="login-form">
            <form action onSubmit={(e) => handleSubmit(e)}>
              <input
                type="email"
                placeholder="Email@gmail.com"
                value={username}
                onChange={(event) => handleOnChangeUsername(event)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => handleOnChangePassword(event)}
              />
              <div className="remember-form">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <div className="forget-pass">
                <a href="#">Forgot Password ?</a>
              </div>
              <button type="submit">LOG-IN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
