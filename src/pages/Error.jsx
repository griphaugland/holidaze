import React, { useEffect } from "react";
import { useVenues } from "../store";
import ErrorBackground from "/error-background.png?url";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { useLocation, useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const { error } = useVenues((state) => ({
    error: state.error,
  }));
  const ErrorNumber1 = JSON.stringify(error.status).split("")[0];
  const ErrorNumber2 = JSON.stringify(error.status).split("")[1];
  const ErrorNumber3 = JSON.stringify(error.status).split("")[2];
  const ErrorText = error.message;

  return (
    <div>
      <div className="error-page relative flex flex-col justify-center items-center">
        <div className="error-text container absolute flex items-center text-black">
          <div className="error-text-container">
            <div className="error-text-price pt-sans-semibold text-black">
              {error.status && (
                <div className="status-numbers">
                  <span className="text-4xl">{ErrorNumber1}</span>
                  <span className="text-4xl">{ErrorNumber2}</span>
                  <span className="text-4xl">{ErrorNumber3}</span>
                </div>
              )}
              {!error.status && "000"}
            </div>
            <div className="flex flex-col w-full items-center gap-5">
              <h1 className="text-4xl poppins-bold p-3 text-black">
                {error.message && ErrorText}
                {!error.message && "Unknown Page"}
              </h1>
              <div className="flex justify-start p-4">
                <ButtonPrimary text="Go home" onClick={() => navigate("/")} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-image-container relative">
        <div className="absolute top-0 left-0 w-full h-full"></div>
        <img
          src={ErrorBackground}
          alt="Hero"
          className="w-full h-96 object-cover hero-image"
        />
      </div>
    </div>
  );
}

export default Error;
