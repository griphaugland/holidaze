import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenues } from "../../store";

function ButtonPrimary({ text, onClick }) {
  const { loading, setLoading } = useVenues();

  const handleClick = () => {
    setLoading(true);
    onClick();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn-primary text-sm poppins-semibold flex items-center justify-between ${
        loading ? "bg-gray-400 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <p>{text}</p>
      <ArrowForwardIcon />
    </button>
  );
}

export default ButtonPrimary;
