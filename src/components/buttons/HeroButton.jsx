import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function HeroButton({ text, searchFor }) {
  const navigate = useNavigate();

  async function sendToSearch() {
    navigate("/venues?q=" + searchFor);
  }

  return (
    <button
      onClick={sendToSearch}
      className="hero-btn-primary text-sm poppins-semibold"
    >
      <p className="">{text}</p>
      <ArrowForwardIcon />
    </button>
  );
}

export default HeroButton;
