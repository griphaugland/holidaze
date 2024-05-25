import React, { useEffect } from "react";
import ErrorBackground from "/error-background.png?url";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { useLocation, useNavigate } from "react-router-dom";
import { useErrors } from "../store";

function NotFoundPage() {
  const navigate = useNavigate();
  const { setError } = useErrors();
  const location = useLocation();
  const ErrorNumber1 = 4;
  const ErrorNumber2 = 0;
  const ErrorNumber3 = 4;

  return (
    <div>
      <div className="error-page relative flex flex-col justify-center items-center">
        <div className="error-text container absolute flex items-center text-black">
          <div className="error-text-container">
            <div className="error-text-price pt-sans-semibold text-black">
              <div className="status-numbers">
                <span className="text-4xl">{ErrorNumber1}</span>
                <span className="text-4xl">{ErrorNumber2}</span>
                <span className="text-4xl">{ErrorNumber3}</span>
              </div>
            </div>
            <div className="flex flex-col w-full items-center gap-5">
              <h1 className="text-4xl poppins-bold p-3 text-black">Whoops!</h1>
              <p>Could not find page:</p>
              <p>{location.pathname}</p>
              <div className="flex justify-start p-4">
                <ButtonPrimary
                  text="Go home"
                  onClick={() => {
                    navigate("/");
                    setError(null);
                  }}
                />
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

export default NotFoundPage;
