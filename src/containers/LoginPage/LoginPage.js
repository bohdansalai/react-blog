import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = ({ setIsLoggedIn, setUserName, setIsAdmin }) => {
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

    if (login === "admin") {
      if (password === "admin") setIsAdmin(true);
      else {
        alert("Passwors is incorrect");
        return false;
      }
    }

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", login);

    setUserName(login);
    setIsLoggedIn(true);
    history("/");
  };

  return (
    <form className="loginForm" onSubmit={handleLogIn}>
      <h2>Authorization</h2>
      <p>admin - login: admin; password: admin. normal user - whatever </p>
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
      <div className="addPostControl">
        <button type="submit" className="commonBtn">
          Log in
        </button>
      </div>
    </form>
  );
};
