import React, { useState, useLocation } from "react";
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
import { BlogCard } from "./containers/BlogPage/components/BlogCard";
import { BlogCardPage } from "./containers/BlogPage/components/BlogCardPage";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("userName") === "admin"
  );

  return (
    <React.StrictMode>
      <Router>
        <div className="App">
          <Header
            userName={userName}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
            isAdmin={isAdmin}
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
                      setIsAdmin={setIsAdmin}
                    />
                  </PublicRoute>
                }
              />
              <Route
                path="/blog/:postId"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <BlogCardPage isAdmin={isAdmin} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                    <BlogPage isAdmin={isAdmin} />
                  </PrivateRoute>
                }
              />

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/" element={<Navigate to="/blog" />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
