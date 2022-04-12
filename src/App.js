import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Header/Header";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <React.StrictMode>
      <Router>
        <div className="App">
          <Header
            userName={userName}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <main>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  !isLoggedIn ? (
                    <Navigate to="/login" />
                  ) : (
                    <Navigate to="/blog" />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  !isLoggedIn ? (
                    <LoginPage
                      setUserName={setUserName}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  ) : (
                    <Navigate to="/blog" />
                  )
                }
              />
              <Route
                path="/blog"
                element={!isLoggedIn ? <Navigate to="/login" /> : <BlogPage />}
              />
            </Routes>
          </main>
          <Footer year={new Date().getFullYear()} />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
