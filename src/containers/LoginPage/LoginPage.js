import React from "react";
import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <h1>
      <form className="loginForm">
        <h3>Authorization</h3>
        <div>
          <input className="loginFormInput" type="text" placeholder="login" />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="password"
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
