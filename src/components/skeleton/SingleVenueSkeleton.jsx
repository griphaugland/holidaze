import React from "react";
import "../../css/components/skeleton.css";

function SingleVenueSkeletonLoader() {
  return (
    <div className="single-venue-skeleton-container">
      <div className="single-venue-skeleton-image"></div>
      <div className="single-venue-skeleton-text"></div>
      <div className="single-venue-skeleton-text"></div>
    </div>
  );
}

export default SingleVenueSkeletonLoader;
