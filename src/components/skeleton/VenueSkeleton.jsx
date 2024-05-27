import React from "react";
import "../../css/components/skeleton.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function SkeletonLoader() {
  return (
    <article className="flex flex-col relative items-start justify-between shadow-md rounded-lg venue-card venue-skeleton">
      <button
        name="favorite button"
        className="favorite-button favorite-button-small backdrop-blur-sm backdrop-brightness-90 rounded-full absolute top-2 right-2 p-2 flex flex-row  gap-4"
      >
        <FavoriteBorderIcon className="text-gray-200 " />
      </button>
      <div className="venue-skeleton-image"></div>
      <div className="flex items-start gap-2 w-full flex-col justify-between min-h-36">
        <div className="flex items-start flex-col px-4 gap-1 w-full">
          <div className="venue-skeleton-title"></div>
          <div className="venue-skeleton-price"></div>
          <div className="venue-skeleton-description mt-4"></div>
        </div>
      </div>
    </article>
  );
}

export default SkeletonLoader;
