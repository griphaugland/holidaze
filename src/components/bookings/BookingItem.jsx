import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { format } from "date-fns";

function BookingItem({ booking, onImageLoad }) {
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

  if (!booking.venue) {
    return <div className="error">Booking venue information is missing.</div>;
  }

  const bookingClass = `bg-white w-full rounded-md shadow-md booking-card ${
    stayStarted ? "stay-started" : ""
  } ${stayFinished ? "stay-finished" : ""}`;

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
            booking.venue.media[0]?.url === "https://source.unsplash.com/random"
              ? "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
              : booking.venue.media[0]?.url ||
                "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
          }
          alt={booking.venue.media[0]?.alt || booking.venue.name}
          className="object-cover"
          onLoad={onImageLoad}
        />
        <div className="flex flex-col justify-start p-4">
          <div className="flex flex-col gap-4 justify-between">
            <h4 title={booking.venue.name} className="text-md font-semibold">
              {booking.venue.name
                ? booking.venue.name.length > 12
                  ? booking.venue.name.substring(0, 12) + "..."
                  : booking.venue.name
                : "No name found"}
            </h4>
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

export default BookingItem;
