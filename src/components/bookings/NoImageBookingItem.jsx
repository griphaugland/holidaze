import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function NoImageBookingItem({ booking }) {
  const [stayFinished, setStayFinished] = useState(false);
  const [stayStarted, setStayStarted] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dateFrom = new Date(booking.dateFrom);
    const dateTo = new Date(booking.dateTo);

    if (today > dateTo && today > dateFrom) {
      setStayFinished(true);
    } else {
      setStayFinished(false);
    }

    if (today > dateFrom && today < dateTo) {
      setStayStarted(true);
    } else {
      setStayStarted(false);
    }
  }, [booking]);

  const bookingClass = `bg-white w-full rounded-md shadow-md booking-card ${
    stayStarted ? "stay-started" : ""
  } ${stayFinished ? "stay-finished relative" : ""}`;

  return (
    <Link
      key={booking.id}
      name={`click to go to booking ${booking.id}`}
      to={`/bookings/${booking.id}`}
      className={bookingClass}
    >
      {stayStarted && (
        <div className="absolute bottom-2 left-2 flex items-center justify-center">
          <h4 className="text-sm booking-started tracking-wide bg-white rounded-lg p-1 px-2">
            Booking underway
          </h4>
        </div>
      )}
      {stayFinished && (
        <div className="absolute bottom-2 left-2 booking-over flex items-center justify-center">
          <h4 className="text-sm tracking-wide bg-white rounded-lg p-1 px-2">
            Booking finished
          </h4>
        </div>
      )}
      <div className={`flex gap-4`}>
        <img
          loading="lazy"
          src={
            booking.customer.avatar.url ||
            "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
          }
          alt={booking.customer.avatar?.alt || "No image found"}
          className="object-cover"
        />
        <div className="flex flex-col justify-start p-4">
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex items-start flex-col">
              <p className="text-xs poppins-regular">Booked by</p>
              <h4 className="text-md font-semibold">{booking.customer.name}</h4>
            </div>
            <div className="text-xs pt-sans-regular">
              From:
              <p className="text-xs poppins-regular text-gray-500">
                {format(new Date(booking.dateFrom), "dd/MM/yyyy")}
              </p>
              To:
              <p className="text-xs poppins-regular text-gray-500">
                {format(new Date(booking.dateTo), "dd/MM/yyyy")}
              </p>
            </div>
          </div>
          <div className="view-booking arrow-move-booking mt-auto">
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoImageBookingItem;
