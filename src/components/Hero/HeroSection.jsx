import React from "react";
import HeroButton from "../buttons/HeroButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function HeroSection({ src, title, price }) {
  return (
    <>
      <div className="hero-text container absolute text-white left-0">
        <h1 className="text-4xl poppins-bold text-white">{title}</h1>
        <p className="hero-text-price text-xl pt-sans-semibold text-white">
          {price}
        </p>
        <HeroButton text="View" searchFor="Tokyo" />
      </div>
      <button className="hero-btn-next absolute p-3">
        <ArrowForwardIcon />
      </button>
      <div className="hero-image-container relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <img
          src={src}
          alt="Hero"
          className="w-full h-96 object-cover hero-image"
        />
      </div>
    </>
  );
}

export default HeroSection;
