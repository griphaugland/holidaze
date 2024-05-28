import React from "react";
import { Navigate } from "react-router-dom";
import { useGeneral } from "../store";

const ProtectedRoute = ({ children, access, venueManager }) => {
  const { isLoggedIn, user } = useGeneral();

  // If access is restricted to logged in users and user is not logged in
  if (access === "loggedIn" && !isLoggedIn) {
    console.log("User not logged in, redirecting to home");
    return <Navigate to="/" />;
  }

  // If the user is logged in and venueManager restriction is applied
  if (isLoggedIn && venueManager && !user.data.venueManager) {
    console.log("User is not a venue manager, redirecting to home");
    return <Navigate to="/" />;
  }

  // If access is restricted to not logged in users and user is logged in
  if (access === "notLoggedIn" && isLoggedIn) {
    console.log("User is logged in but should not be, redirecting to home");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
