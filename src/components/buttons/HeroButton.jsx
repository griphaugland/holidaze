import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../../store";

function HeroButton({ text, searchFor, classes }) {
  const navigate = useNavigate();
  const { loading, setLoading } = useVenues();

  async function sendToSearch() {
    setLoading(true);
    navigate("/venues?q=" + searchFor);
    setLoading(false);
  }

  return (
    <button
      name="hero button to start search"
      onClick={sendToSearch}
      className={`${classes} ${loading ? " cursor-not-allowed" : ""}`}
      disabled={loading}
    >
      <p>{text}</p>
      <ArrowForwardIcon />
    </button>
  );
}

export default HeroButton;
