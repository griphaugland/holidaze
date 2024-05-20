import React from "react";

function Loader({ size }) {
  if (size === "small")
    return (
      <div className="flex items-start justify-start relative">
        <div className="loader-small">
          <div className="loader__icon">
            <div className="loader__icon__item"></div>
            <div className="loader__icon__item"></div>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="absolute min-w-full z-50 min-h-svh top-0 flex items-center justify-center">
        <div className="loader">
          <div className="loader__icon">
            <div className="loader__icon__item"></div>
            <div className="loader__icon__item"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
