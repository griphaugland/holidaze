import React from "react";
import { Navigate } from "react-router-dom";
import { useVenues } from "../store";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useVenues();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
