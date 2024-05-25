import { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import {
  format,
  isEqual,
  addDays,
  subDays,
  eachDayOfInterval,
  parseISO,
  isAfter,
  isBefore,
} from "date-fns";
import { useBookingStore, useVenues, useGeneral } from "../../../store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function Booking() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const { venueData, error, setError } = useBookingStore();
  const { user, apiKey } = useGeneral();
  const { loading, setLoading } = useVenues();
  const [disabledDates, setDisabledDates] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;

    let newSelectedDates = [...selectedDates];
    if (newSelectedDates.length === 2 || errorOccurred) {
      newSelectedDates = [date];
      setErrorOccurred(false);
    } else {
      newSelectedDates.push(date);
      newSelectedDates.sort((a, b) => a - b);
    }

    if (hasDisabledDatesBetween(newSelectedDates)) {
      setError({
        message: "You cannot book over an already existing booking.",
      });
      setErrorOccurred(true);
    } else {
      setSelectedDates(newSelectedDates);
      setError(null);
      setErrorOccurred(false);
    }
  };

  const isDateDisabled = (date) => {
    return disabledDates.some((disabledDate) => isEqual(date, disabledDate));
  };

  const hasDisabledDatesBetween = (dates) => {
    if (dates.length < 2) return false;
    const [start, end] = dates;
    return disabledDates.some(
      (disabledDate) =>
        isAfter(disabledDate, start) && isBefore(disabledDate, end)
    );
  };

  const totalNights =
    selectedDates.length === 2
      ? (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24) + 1
      : 0;

  useEffect(() => {
    const disabledArray = new Set();

    const addDateToSet = (date) => {
      disabledArray.add(format(date, "yyyy-MM-dd"));
    };

    if (venueData.bookings.length > 0) {
      venueData.bookings.forEach((previousBooking) => {
        const start = parseISO(previousBooking.dateFrom);
        const end = parseISO(previousBooking.dateTo);

        // Get all dates in the range
        const allDates = eachDayOfInterval({ start, end });
        allDates.forEach((date) => addDateToSet(date));
      });
    }

    setDisabledDates(Array.from(disabledArray).map((date) => parseISO(date)));
  }, [venueData]);

  const handleGuestCountChange = (change) => {
    setGuestCount((prevCount) => {
      const newCount = prevCount + change;
      if (newCount < 1) return 1;
      if (newCount > venueData.maxGuests) return venueData.maxGuests;
      return newCount;
    });
  };

  const handleBooking = async () => {
    setLoading(true);
    setBookingMessage(null);
    setBookingError(null);

    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.accessToken}`,
            "X-Noroff-API-Key": apiKey.data.key,
          },
          body: JSON.stringify({
            dateFrom: format(selectedDates[0], "yyyy-MM-dd"),
            dateTo: format(selectedDates[1], "yyyy-MM-dd"),
            guests: guestCount,
            venueId: venueData.id,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.errors && errorResponse.errors.length > 0
            ? errorResponse.errors[0].message
            : "Failed to create booking. Please check your details.";
        throw new Error(errorMessage);
      }
      const result = await response.json();
      console.log("Booking successful:", result);
      setBookingMessage("Booking successful!");
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setBookingError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        className="react-calendar p-2 pt-9"
        view="month"
        onClickDay={(date) => handleDateClick(date)}
        value={selectedDates}
        tileDisabled={({ date, view }) =>
          view === "month" && isDateDisabled(date)
        }
        next2Label={<KeyboardDoubleArrowRightIcon />}
        prev2Label={<KeyboardDoubleArrowLeftIcon />}
        nextLabel={<KeyboardArrowRightIcon />}
        prevLabel={<KeyboardArrowLeftIcon />}
      />
      <div className="flex justify-between flex-col min-h-12 px-4">
        {error && <p className="text-red-500 py-2">{error.message}</p>}
        <div className="poppins-regular text-gray-600 w-full mt-auto flex justify-between">
          <p className="text-sm">From</p>
          <p className="text-sm">To</p>
        </div>
        <div className="flex justify-between">
          {selectedDates.length > 0 &&
            selectedDates.map((date) => (
              <p
                className="poppins-bold text-black"
                key={format(date, "yyyy-MM-dd") + Math.random(10)}
              >
                {format(date, "dd/MM/yyyy")}
              </p>
            ))}
        </div>
      </div>
      <div className="flex justify-between mt-5 min-h-12 px-4">
        <p className="poppins-regular text-sm text-gray-600">NOK / night:</p>
        <p className="poppins-bold text-black">
          {venueData && venueData.price}
        </p>
        <p className="poppins-regular text-sm text-gray-600">
          Total price ({totalNights}) {totalNights === 1 ? "night" : "nights"}:
        </p>
        <p className="poppins-bold text-black">
          {venueData.price * totalNights}
        </p>
      </div>
      {selectedDates.length === 2 && (
        <>
          <div className=" px-4 flex justify-between items-center">
            <p className="poppins-regular text-gray-600 text-sm">
              Number of guests:
            </p>
            <div className="guest-input-container">
              <button
                onClick={() => handleGuestCountChange(-1)}
                disabled={guestCount <= 1}
              >
                -
              </button>
              <input
                className="poppins-bold"
                type="number"
                value={guestCount}
                readOnly
                min="1"
                max={venueData.maxGuests}
              />
              <button
                onClick={() => handleGuestCountChange(1)}
                disabled={guestCount >= venueData.maxGuests}
              >
                +
              </button>
            </div>
          </div>
          <div className="my-3 mx-3">
            {user.data.name === venueData.owner.name ? (
              <button
                className="btn-primary disabled-button min-w-56 text-sm poppins-semibold flex items-center justify-between"
                disabled={true}
              >
                <p>Book now</p>
                <ArrowForwardIcon />
              </button>
            ) : (
              <button
                onClick={handleBooking}
                className={`btn-primary min-w-56 text-sm poppins-semibold flex items-center justify-between ${
                  loading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                <p>Book now</p>
                <ArrowForwardIcon />
              </button>
            )}
          </div>
        </>
      )}
      <div className="flex justify-center w-full">
        {bookingMessage && (
          <p className="text-green-500 p-4 max-width-450px">{bookingMessage}</p>
        )}
        {bookingError && (
          <p className="text-red-500 p-4 max-width-450px">{bookingError}</p>
        )}
      </div>
    </div>
  );
}

export default Booking;
