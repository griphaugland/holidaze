import React, { useEffect, useState, useMemo } from "react";
import BookingItem from "./BookingItem";
import BookingSkeletonLoader from "../skeleton/BookingSkeleton";

function BookingList({ bookings, error, tab, from }) {
  const [loading, setLoading] = useState(true);

  const filteredBookings = useMemo(() => {
    const today = new Date();
    return bookings.filter((booking) => {
      const dateFrom = new Date(
        from === "dashboard" ? booking.data.dateFrom : booking.dateFrom
      );
      const dateTo = new Date(
        from === "dashboard" ? booking.data.dateTo : booking.dateTo
      );
      if (tab === "upcoming") {
        return dateTo >= today;
      } else if (tab === "finished") {
        return dateTo < today;
      }
      if (tab === "all") return true;
      return false;
    });
  }, [bookings, tab, from]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [bookings, tab, from]);

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
          .sort((a, b) => {
            const today = new Date();
            const aDateFrom = new Date(
              from === "dashboard" ? a.data.dateFrom : a.dateFrom
            );
            const aDateTo = new Date(
              from === "dashboard" ? a.data.dateTo : a.dateTo
            );
            const bDateFrom = new Date(
              from === "dashboard" ? b.data.dateFrom : b.dateFrom
            );
            const bDateTo = new Date(
              from === "dashboard" ? b.data.dateTo : b.dateTo
            );

            const aFinished = aDateTo < today;
            const bFinished = bDateTo < today;

            if (tab === "all") {
              if (aFinished && !bFinished) return 1;
              if (!aFinished && bFinished) return -1;
            }

            return aDateFrom.getTime() - bDateFrom.getTime();
          })
          .map((booking) => {
            const bookingData = from === "dashboard" ? booking.data : booking;
            return <BookingItem key={bookingData.id} booking={bookingData} />;
          })
      )}
    </div>
  );
}

export default BookingList;
