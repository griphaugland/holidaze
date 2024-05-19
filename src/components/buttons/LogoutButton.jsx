import React from "react";
import { useVenues } from "../store";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useVenues();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;
