import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = (props) => {
  const history = useNavigate();
  const handleLogIn = (e) => {
    e.preventDefault();
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
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="password"
            required
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
