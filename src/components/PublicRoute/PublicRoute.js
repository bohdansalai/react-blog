import React from "react";
import { Navigate, Route } from "react-router-dom";

export const PublicRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="/" />;
};
