import React from "react";
import "../../css/components/skeleton.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function BookingSkeletonLoader() {
  return (
    <div className="bg-white w-full rounded-md shadow-md booking-card booking-skeleton">
      <div className="flex gap-4">
        <div className="booking-skeleton-image"></div>
        <div className="flex flex-col w-1/2 justify-start p-4">
          <div className="flex flex-col">
            <div className="booking-skeleton-title mb-3"></div>
            <div className="flex items-start max-h-10 flex-col">
              <div className="booking-skeleton-from"></div>
              <div className="booking-skeleton-date"></div>
            </div>
            <div className="flex items-start max-h-10 mt-2 flex-col">
              <div className="booking-skeleton-from"></div>
              <div className="booking-skeleton-date"></div>
            </div>
          </div>
          <div className="view-booking booking-skeleton-arrow mt-auto">
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSkeletonLoader;
