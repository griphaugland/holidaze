import React, { useEffect, useState } from "react";
import NoImageBookingItem from "./NoImageBookingItem";

function NoImageBookingList({ bookings, error, tab }) {
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const today = new Date();
    const filterBookings = () => {
      const filtered = bookings.filter((booking) => {
        const dateFrom = new Date(booking.dateFrom);
        const dateTo = new Date(booking.dateTo);
        if (tab === "upcoming") {
          return dateTo >= today;
        } else if (tab === "finished") {
          return dateTo < today;
        }
        return false;
      });
      setFilteredBookings(filtered);
    };

    filterBookings();
  }, [bookings, tab]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (filteredBookings.length === 0) {
    return (
      <h2 className="text-center text-sm my-12 text-gray-500 w-full">
        No bookings found
      </h2>
    );
  } else {
    return (
      <div className="flex flex-col booking-container my-6 gap-4">
        {filteredBookings
          .sort(
            (a, b) =>
              new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
          )
          .map((booking) => {
            return (
              <NoImageBookingItem
                key={`${booking.id} + ${Math.random() * 100}`}
                booking={booking}
              />
            );
          })}
      </div>
    );
  }
}

export default NoImageBookingList;
