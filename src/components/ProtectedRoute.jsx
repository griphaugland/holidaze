import React from "react";
import { Navigate } from "react-router-dom";
import { useGeneral } from "../store";

const ProtectedRoute = ({ children, access, venueManager }) => {
  const { isLoggedIn, user } = useGeneral();
  // om ikke logget inn, ingen tilgang på disse sidene
  if (access === "loggedIn" && !isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (isLoggedIn) {
    // om sidene er for venueManager og brukeren ikke er venueManager
    if (venueManager === true && !user.data.venueManager) {
      return <Navigate to="/" />;
    }
    // om sidene er for venueManager og brukeren ikke er venueManager
    if (venueManager === false && user.data.venueManager) {
      return <Navigate to="/" />;
    }
  }
  // om logget inn, ingen tilgang på disse sidene
  if (access === "notLoggedIn" && isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
