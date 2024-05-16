import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenues } from "../../store";
import { Link } from "react-router-dom";

function ButtonPrimary({ text, func }) {
  const loggedIn = useVenues((state) => state.loggedIn);
  if (loggedIn) {
    return (
      <button onClick={func} className="btn-primary text-sm poppins-semibold">
        <p className="">{text}</p>
        <ArrowForwardIcon />
      </button>
    );
  } else {
    return (
      <Link to="/login">
        <button
          disabled
          onClick={() => {
            Navigate("/login");
          }}
          className="btn-primary text-sm poppins-semibold"
        >
          <p className="">Log in to book</p>
          <ArrowForwardIcon />
        </button>
      </Link>
    );
  }
}

export default ButtonPrimary;
