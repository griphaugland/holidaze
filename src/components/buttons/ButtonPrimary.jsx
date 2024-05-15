import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ButtonPrimary({ text }) {
  return (
    <button className="btn-primary text-sm poppins-semibold">
      <p className="">{text}</p>
      <ArrowForwardIcon />
    </button>
  );
}

export default ButtonPrimary;
