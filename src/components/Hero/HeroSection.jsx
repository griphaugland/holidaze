import React from "react";
import HeroButton from "../buttons/HeroButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function HeroSection({ src, altText, title, price, searchWord, nextSlide }) {
  return (
    <>
      <div className="hero-text container absolute text-white left-0">
        <h1 className="text-4xl poppins-bold text-white">{title}</h1>
        <h4 className="hero-text-price text-xl pt-sans-semibold text-white">
          {price}
        </h4>
        <HeroButton
          text="View"
          searchFor={searchWord}
          classes="hero-btn-primary text-sm poppins-semibold flex items-center justify-between"
        />
      </div>
      <button
        className="hero-btn-next absolute p-3"
        name="click to view next slide"
        aria-label="click to view next slide"
        onClick={nextSlide}
      >
        <ArrowForwardIcon />
      </button>
      <div className="hero-image-container relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <img
          loading="lazy"
          src={
            src ||
            "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
          }
          alt={altText}
          className="w-full h-96 object-cover hero-image"
        />
      </div>
    </>
  );
}

export default HeroSection;
