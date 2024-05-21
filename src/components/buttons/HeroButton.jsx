import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useVenues } from "../../store";

function HeroButton({ text, searchFor }) {
  const navigate = useNavigate();
  const { loading, setLoading } = useVenues();

  async function sendToSearch() {
    setLoading(true);
    navigate("/venues?q=" + searchFor);
    setLoading(false);
  }

  return (
    <button
      onClick={sendToSearch}
      className={`hero-btn-primary text-sm poppins-semibold flex items-center justify-between ${
        loading ? "bg-gray-400 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <p>{text}</p>
      <ArrowForwardIcon />
    </button>
  );
}

export default HeroButton;
