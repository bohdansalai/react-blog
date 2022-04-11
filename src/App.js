import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Header/Header";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";

export function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}

export default App;
