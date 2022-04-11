import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = ({ setIsLoggedIn, setUserName }) => {
  const history = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = (e) => {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", login);

    setUserName(login);
    setIsLoggedIn(true);
    history("/");
  };

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h3>Authorization</h3>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="login"
            required
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit" className="blackBtn">
            Log in
          </button>
        </div>
      </form>
    </h1>
  );
};
