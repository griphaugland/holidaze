import React from "react";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import "../../../css/components/modal/modal.css";

function SessionTimedOut() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/login");
  }, 3000);
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded w-screen max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-start flex justify-start items-start gap-6">
          <TimerOffIcon className=" success-icon" />
          Your session has expired
        </h2>
        <div className="loader-container my-4 flex flex-col gap-5">
          <p className="">Please log in again. Redirecting to login page</p>
          <Loader size="small" />
        </div>
      </div>
    </div>
  );
}

export default SessionTimedOut;
