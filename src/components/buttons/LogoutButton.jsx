import React from "react";
import { useGeneral } from "../../store";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useModal from "../modal/useModal";

const LogoutButton = ({ size }) => {
  const { logout } = useGeneral();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  if (size === "navigation") {
    return (
      <button onClick={handleLogout} className="btn-logout-nav">
        Logout
        <LogoutIcon />
      </button>
    );
  } else if (size === "profile") {
    return (
      <button onClick={handleLogout} className="btn-logout-profile text-sm">
        Logout
        <LogoutIcon />
      </button>
    );
  } else {
    return (
      <button onClick={handleLogout} className="btn-logout">
        Logout
        <LogoutIcon />
      </button>
    );
  }
};

export default LogoutButton;
