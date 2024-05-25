import React from "react";
import { Navigate } from "react-router-dom";
import { useGeneral } from "../store";

const ProtectedRoute = ({ children, access }) => {
  const { isLoggedIn, user } = useGeneral((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  if (access === "loggedIn" && !isLoggedIn) {
    if (user.data.venueManager) {
      return;
    } else {
      return <Navigate to="/" />;
    }
  }

  if (access === "notLoggedIn" && isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
