import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { format, parseISO, differenceInDays } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useGeneral } from "../../../store";

function BookingEditModal({ booking, isOpen, onClose }) {
  const { user, apiKey } = useGeneral();
  const [selectedDates, setSelectedDates] = useState([]);
  const [guestCount, setGuestCount] = useState(booking.guests);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (booking.dateFrom && booking.dateTo) {
      setSelectedDates([parseISO(booking.dateFrom), parseISO(booking.dateTo)]);
    }
  }, [booking]);

  const handleDateClick = (date) => {
    if (selectedDates.length === 2) {
      setSelectedDates([date]);
    } else {
      setSelectedDates((prev) => [...prev, date].sort((a, b) => a - b));
    }
  };

  const handleGuestCountChange = (change) => {
    setGuestCount((prevCount) => Math.max(1, prevCount + change));
  };

  const handleSave = async () => {
    if (selectedDates.length < 2) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings/${booking.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.accessToken}`,
            "X-Noroff-API-Key": apiKey.data.key,
          },
          body: JSON.stringify({
            dateFrom: selectedDates[0],
            dateTo: selectedDates[1],
            guests: guestCount,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update booking.");
      }

      const updatedBooking = await response.json();

      setBookingMessage("Booking updated successfully.");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Edit Booking</h2>
        <ReactCalendar
          minDate={new Date()}
          value={selectedDates}
          onClickDay={handleDateClick}
          next2Label={<KeyboardDoubleArrowRightIcon />}
          prev2Label={<KeyboardDoubleArrowLeftIcon />}
          nextLabel={<KeyboardArrowRightIcon />}
          prevLabel={<KeyboardArrowLeftIcon />}
        />
        <div className="mt-4">
          <div className="flex justify-between">
            <p className="text-gray-600">From</p>
            <p className="text-gray-600">To</p>
          </div>
          <div className="flex justify-between">
            {selectedDates.length > 0 &&
              selectedDates.map((date) => (
                <p
                  key={format(date, "yyyy-MM-dd") + Math.random() * 100}
                  className="text-black"
                >
                  {format(date, "dd/MM/yyyy")}
                </p>
              ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-600">Number of guests:</p>
          <div className="flex items-center">
            <button
              onClick={() => handleGuestCountChange(-1)}
              disabled={guestCount <= 1}
              className="px-2"
            >
              -
            </button>
            <span className="px-4">{guestCount}</span>
            <button onClick={() => handleGuestCountChange(1)} className="px-2">
              +
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {bookingMessage && (
          <p className="text-green-500 mt-2">{bookingMessage}</p>
        )}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className={`btn-primary-reverse py-2 px-4 bg-white transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Canceling..." : "Cancel"}
            <ArrowBackIcon />
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className={` btn-primary py-2 px-4 text-white transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "button-color"
            }`}
            disabled={loading}
          >
            {loading ? "Editing..." : "Edit Booking"}
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingEditModal;
