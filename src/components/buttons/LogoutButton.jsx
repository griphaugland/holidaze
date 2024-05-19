import React from "react";
import { useVenues } from "../../store";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useModal from "../modal/useModal";

const LogoutButton = () => {
  const { logout } = useVenues();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
      <LogoutIcon />
    </button>
  );
};

export default LogoutButton;
