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
import { NotFoundPage } from "./containers/NotFoundPage/NotFoundPage";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

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
                path="/login"
                element={
                  <PublicRoute isLoggedIn={isLoggedIn}>
                    <LoginPage
                      setUserName={setUserName}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </PublicRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <BlogPage />
                  </PrivateRoute>
                }
              />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/" element={<Navigate to="/blog" />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          <Footer year={new Date().getFullYear()} />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
