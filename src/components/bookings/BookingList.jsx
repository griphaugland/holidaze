import React, { useEffect, useState } from "react";
import BookingItem from "./BookingItem";

function BookingList({ bookings, error, tab }) {
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const today = new Date();
    const filterBookings = () => {
      const filtered = bookings.filter((booking) => {
        const dateFrom = new Date(booking.data.dateFrom);
        const dateTo = new Date(booking.data.dateTo);
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

  return (
    <div className="flex flex-col booking-container my-6 gap-4">
      {filteredBookings
        .sort(
          (a, b) =>
            new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
        )
        .map((booking) => {
          return (
            <BookingItem
              key={`${booking.id} + ${Math.random() * 100}`}
              booking={booking.data}
            />
          );
        })}
    </div>
  );
}

export default BookingList;
