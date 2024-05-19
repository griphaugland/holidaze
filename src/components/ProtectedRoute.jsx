import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useVenues } from "../store";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useVenues();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const timeoutId = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn]);

  if (shouldRedirect) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
