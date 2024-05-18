import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Link } from "react-router-dom";

function ButtonPrimary({ text, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="btn-primary text-sm poppins-semibold"
      >
        <p className="">{text}</p>
        <ArrowForwardIcon />
      </button>
    </>
  );
}

export default ButtonPrimary;
