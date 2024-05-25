import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PetsIcon from "@mui/icons-material/Pets";
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
      to={`/bookings/${booking.id}`}
      className={bookingClass}
    >
      {stayStarted && (
        <div className="absolute bottom-0 left-2 flex items-center justify-center">
          <p className="text-xl booking-started tracking-wide bg-white rounded-lg p-1 px-2">
            Booking underway
          </p>
        </div>
      )}
      <div className={`flex gap-4`}>
        <img
          src={booking.customer.avatar.url || ""}
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
