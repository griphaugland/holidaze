import React, { useEffect, useState, useMemo } from "react";
import NoImageBookingItem from "./NoImageBookingItem";
import BookingSkeletonLoader from "../skeleton/BookingSkeleton"; // Assuming you have a similar skeleton loader for NoImageBooking

function NoImageBookingList({ bookings, error, tab }) {
  const [loading, setLoading] = useState(true);

  const filteredBookings = useMemo(() => {
    const today = new Date();
    return bookings.filter((booking) => {
      const dateFrom = new Date(booking.dateFrom);
      const dateTo = new Date(booking.dateTo);
      if (tab === "upcoming") {
        return dateTo >= today;
      } else if (tab === "finished") {
        return dateTo < today;
      }
      if (tab === "all") return true;
      return false;
    });
  }, [bookings, tab]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [bookings, tab]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col booking-container my-6 gap-4">
      {loading ? (
        Array.from({ length: filteredBookings.length }).map((_, index) => (
          <BookingSkeletonLoader key={index} />
        ))
      ) : filteredBookings.length === 0 ? (
        <h2 className="text-center text-sm my-12 text-gray-500 w-full">
          No bookings found
        </h2>
      ) : (
        filteredBookings
          .sort(
            (a, b) =>
              new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
          )
          .map((booking) => (
            <NoImageBookingItem key={booking.id} booking={booking} />
          ))
      )}
    </div>
  );
}

export default NoImageBookingList;
