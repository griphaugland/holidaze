import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import AddToFavorites from "../components/buttons/AddToFavorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Facilities from "../components/venues/Facilities";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import ModalButton from "../components/buttons/ModalButton";
import { useBookingStore, useGeneral } from "../store";
import { differenceInDays, parseISO, format } from "date-fns";

function SingleVenue() {
  const { user, apiKey } = useGeneral();
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { id } = useParams();
  const { setVenueData } = useBookingStore();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastImage, setLastImage] = useState(false);
  const [venue, setVenue] = useState({
    id: "7d2f1470-5ce0-4240-a1c9-09c792748d5c",
    _count: { bookings: 0 },
    created: "2021-08-17T09:00:00.000Z",
    updated: "2021-08-17T09:00:00.000Z",
    name: "",
    description: "",
    price: 0,
    rating: 0,
    location: {
      city: "Oslo",
      zip: "0165",
      country: "Norway",
      continent: "Europe",
    },
    maxGuests: 0,
    media: [
      {
        url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600",
        alt: "",
      },
    ],
    meta: { wifi: false, parking: false, breakfast: false },
    owner: {
      name: "Doja Cat",
      avatar: "https://example.com/avatar.jpg",
    },
    bookings: [], // Default empty array for bookings
  });

  useEffect(() => {
    setVenueData(venue);
  }, [venue]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMaxWidth, setMaxWidth] = useState(window.innerWidth >= 1638);

  const sliderRef = useRef(null);

  async function getSingleVenue(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setError({ error: { statusCode: res.statusText, status: res.status } });
      }
      setLoading(false);
      setVenue(data.data);
      console.log(data);
    } catch (e) {
      setError({ error: { statusCode: e.statusCode, status: e.status } });
    }
  }

  useEffect(() => {
    setLoading(true);
    const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`;
    getSingleVenue(url);
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setMaxWidth(window.innerWidth >= 1638);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const width = isMobile ? 100 : 75;
      sliderRef.current.style.transform = `translateX(-${
        currentImageIndex * width
      }vw)`;
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
    }

    if (
      !isMobile &&
      !isMaxWidth &&
      currentImageIndex === venue.media.length - 1
    ) {
      setLastImage(true);
    } else {
      setLastImage(false);
    }
  }, [currentImageIndex, isMobile, isMaxWidth, venue.media.length]);

  function capitalizeFirstLetter(string) {
    if (string.includes(" ")) {
      const words = string.split(" ");
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizedWords.join(" ");
    } else {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === venue.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleEditVenueClick = () => {
    sessionStorage.setItem("editVenueData", JSON.stringify(venue));
    navigate(`../dashboard/edit-venue?id=${venue.id}`);
  };

  const handleDeleteVenueClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.data.accessToken}`,
            "X-Noroff-API-Key": apiKey.data.key,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete venue.");
      }
      alert("Venue deleted successfully.");
      navigate("/dashboard"); // Redirect to the dashboard or another appropriate page
    } catch (error) {
      setError(true);
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };
  const userBookingArray = venue.bookings.filter(
    (booking) => booking.customer.name === user.data.name
  );

  if (error) {
    return <Error errorResponse={error} />;
  }
  if (loading) {
    return <Loader />;
  }
  if (!venue) {
    return <Loader />;
  }

  return (
    <div className="page-max-width md:self-start xl:self-center flex flex-wrap">
      <div className="relative align-top-header">
        <div className="slider-image-container relative overflow-hidden">
          {venue.media.length > 1 ? (
            <div
              className="flex image-filter"
              ref={sliderRef}
              style={{
                width: `${venue.media.length * (isMobile ? 100 : 75)}vw`,
              }}
            >
              {venue.media.map((media, index) => (
                <img
                  key={index}
                  src={media.url}
                  alt={media.alt}
                  className={`min-h-96 single-venue-slider-image ${
                    isMobile ? "w-full" : "md:w-3/4 w-full"
                  } object-cover object-position-center`}
                />
              ))}
            </div>
          ) : (
            <div className="flex image-filter" ref={sliderRef}>
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt}
                className={`min-h-96  single-venue-slider-image-single-image w-full object-cover object-position-center`}
              />
            </div>
          )}
        </div>
        {venue.media.length > 1 && (
          <button
            onClick={nextImage}
            className={`single-venue-next-button p-3  ${
              lastImage ? "final-image" : " "
            }`}
          >
            <ArrowForwardIcon />
          </button>
        )}
      </div>
      <div className="info-wrapper w-screen flex-row flex flex-wrap">
        <div className="md:w-1/2 px-8 p-6">
          <div
            className={`location flex gap-3 items-center flex-row pt-sans-regular text-gray-700 font-light`}
          >
            <RoomOutlinedIcon />
            <h2 className="pt-sans-regular text-gray-700 font-light tracking-widest">
              {venue.location.city === null &&
                venue.location.address === null &&
                venue.location.country === null && (
                  <span className="pt-sans-regular text-gray-700 font-light">
                    Location not listed
                  </span>
                )}
              {venue.location.address && (
                <>
                  {capitalizeFirstLetter(venue.location.address)}
                  {venue.location.city && (
                    <span className="pt-sans-regular text-gray-700 font-light">
                      {", "}
                    </span>
                  )}
                </>
              )}
              {venue.location.city && (
                <>
                  {capitalizeFirstLetter(venue.location.city)}
                  {venue.location.country && (
                    <span className="pt-sans-regular text-gray-700 font-light">
                      {", "}
                    </span>
                  )}
                </>
              )}
              {venue.location.country && (
                <> {capitalizeFirstLetter(venue.location.country)}</>
              )}
            </h2>
          </div>
          <h1 className="text-2xl py-2 font-bold tracking-widest">
            {venue.name}
          </h1>
          <span className="text-xl py-2 ">{venue.price} NOK /night</span>
          {userBookingArray.length > 0 &&
            userBookingArray.map((userBooking, index) => (
              <div
                className="booking-info mt-4"
                key={index + Math.random(index)}
              >
                <p className="text-md font-regular text-green-600">
                  You have booked the venue from{" "}
                  {format(parseISO(userBooking.dateFrom), "dd/MM/yyyy")} to{" "}
                  {format(parseISO(userBooking.dateTo), "dd/MM/yyyy")}.
                </p>
              </div>
            ))}
          {isMobile && (
            <>
              <div className="w-full py-4 pb-0 justify-start">
                <ModalButton
                  text="Check availability"
                  venue={venue}
                  disabled={user.data.name === venue.owner.name}
                />
              </div>
              {user.data.name === venue.owner.name && (
                <div className="w-full py-4 pb-0 justify-start">
                  <button
                    onClick={handleEditVenueClick}
                    className={`btn-secondary text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p>Edit venue</p>
                    <ArrowForwardIcon />
                  </button>

                  <button
                    onClick={handleDeleteVenueClick}
                    className={`btn-secondary mt-4 text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p className="text-red-400">Delete</p>
                    <ArrowForwardIcon className="text-red-400" />
                  </button>
                </div>
              )}
            </>
          )}
          <div className="maxguests pt-5 md:py-5">
            <h2 className="text-lg font-regula tracking-widest">
              This venue offers
            </h2>
            <Facilities venue={venue} />
          </div>
          {isMobile && (
            <div className="flex flex-wrap flex-row justify-start items-end mb-6">
              {venue.rating > 0 && (
                <div
                  title={`This venue is rated ${venue.rating} stars`}
                  className="p-3 min-w-40 flex flex-row justify-start items-end gap-3"
                >
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className=" font-bold poppins-semibold">{venue.rating}</p>
                </div>
              )}
              {venue.rating === 0 && (
                <div
                  title={`This venue is yet to be rated`}
                  className=" p-3 min-w-40 flex flex-row justify-start items-end gap-3"
                >
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className="text-gray-400 pt-sans-regular">No rating yet</p>
                </div>
              )}
              <AddToFavorites venue={venue} size="large" />
            </div>
          )}
          <div className="description pt-0 py-0 sm:py-5">
            <h2 className="text-lg font-regular tracking-widest">
              Description
            </h2>
            <p className="py-2 text-gray-600 text-sm">
              {venue.description ? venue.description : "No description found"}
            </p>
          </div>
          {/* Profile Section */}
          {venue.owner && (
            <div className="profile-section flex flex-col mt-6">
              <h2 className="text-md font-regular tracking-widest">
                Venue owner
              </h2>
              <div className="py-2 flex justify-between">
                <Link
                  to={`/profile/${venue.owner.name}`}
                  className="flex justify-start items-center gap-3 hover:underline"
                >
                  <img
                    src={venue.owner.avatar.url}
                    alt={venue.owner.avatar.alt}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <p className=" text-gray-600 text-sm">
                    {venue.owner.name === user.data.name
                      ? venue.owner.name + " (You)"
                      : venue.owner.name}
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="md:w-1/2 px-8 sm:p-6 p-0 pb-6">
            <div className="flex flex-row justify-end items-end w-full pt-0 px-8 p-6">
              {venue.rating > 0 && (
                <div className=" p-3 min-w-40 flex flex-row justify-end items-end gap-3">
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className=" font-bold poppins-semibold">{venue.rating}</p>
                </div>
              )}
              {venue.rating === 0 && (
                <div className=" p-3 min-w-40 flex flex-row justify-end items-end gap-3">
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className="text-gray-400 pt-sans-regular">No rating yet</p>
                </div>
              )}
              <div className=" flex min-w-40 flex-row justify-start gap-3">
                <AddToFavorites venue={venue} size="large" />
              </div>
            </div>
            <div className="button-container flex flex-col justify-start w-full">
              <div className="w-full py-4 pb-0 flex justify-end">
                <ModalButton
                  text="Check availability"
                  venue={venue}
                  disabled={user.data.name === venue.owner.name}
                />
              </div>
              {user.data.name === venue.owner.name && (
                <div className="w-full py-4 pb-0 gap-2 flex justify-end">
                  <button
                    onClick={handleEditVenueClick}
                    className={`btn-secondary text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p>Edit venue</p>
                    <ArrowForwardIcon />
                  </button>
                  <button
                    onClick={handleDeleteVenueClick}
                    className={`btn-secondary text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p className="text-red-400">Delete</p>
                    <ArrowForwardIcon className="text-red-400" />
                  </button>
                </div>
              )}
            </div>
            {user.data.name === venue.owner.name &&
              venue.bookings.length > 0 && (
                <div className="bookings-section mt-6 w-full ">
                  <h2 className="text-lg font-regular tracking-widest">
                    Bookings({venue.bookings.length}):
                  </h2>
                  <ul className="flex gap-4 flex-col sm:flex-row flex-wrap py-4">
                    {venue.bookings.map((booking) => (
                      <li
                        key={booking.id}
                        className="booking-card w-full shadow-md rounded-lg  p-4 flex flex-col gap-2"
                      >
                        <h2 className="text-lg">
                          Booking information for{" "}
                          {differenceInDays(
                            parseISO(booking.dateTo),
                            parseISO(booking.dateFrom)
                          )}{" "}
                          day stay
                        </h2>
                        <div className="text-sm flex flex-row flex-wrap justify-between gap-4">
                          <div className="text-sm">
                            <p className="poppins-semibold">From:</p>{" "}
                            <p>{format(booking.dateFrom, "dd/MM/yyyy")}</p>
                          </div>
                          <div className="text-sm">
                            <p className="poppins-semibold">To:</p>{" "}
                            <p>{format(booking.dateTo, "dd/MM/yyyy")}</p>
                          </div>{" "}
                          <div className=" flex flex-col">
                            <p className="poppins-semibold">Guests:</p>
                            <p className="">{booking.guests}</p>
                          </div>
                          <div className=" flex flex-col">
                            <p className="poppins-semibold">NOK Earned:</p>
                            <p className="">
                              {venue.price *
                                differenceInDays(
                                  parseISO(booking.dateTo),
                                  parseISO(booking.dateFrom)
                                )}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm flex flex-row justify-start gap-4">
                          <div className="text-sm flex flex-col">
                            <p className="poppins-semibold ">Booked by:</p>
                          </div>
                          <Link
                            to={`/profile/${booking.customer.name}`}
                            className="flex justify-start items-center gap-3 hover:underline"
                          >
                            <img
                              src={booking.customer.avatar.url}
                              alt={booking.customer.avatar.alt}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <p className=" text-gray-600 text-sm">
                              {booking.customer.name === user.data.name
                                ? booking.customer.name + " (You)"
                                : booking.customer.name}
                            </p>
                          </Link>
                        </div>
                        <div className="text-sm flex flex-col">
                          <p className="poppins-semibold">Booking ID:</p>{" "}
                          <p>{booking.id}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
        {isMobile &&
          user.data.name === venue.owner.name &&
          venue.bookings.length > 0 && (
            <div className="bookings-section mt-6 w-full px-8 ">
              <h2 className="text-lg font-regular tracking-widest">
                Bookings({venue.bookings.length}):
              </h2>
              <ul className="flex gap-4 flex-col sm:flex-row flex-wrap py-4 mb-6">
                {venue.bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="booking-card w-full sm:w-1/2 shadow-md rounded-lg  p-4 flex flex-col gap-2"
                  >
                    <h2 className="text-lg">
                      Booking information for{" "}
                      {differenceInDays(
                        parseISO(booking.dateTo),
                        parseISO(booking.dateFrom)
                      )}{" "}
                      day stay
                    </h2>
                    <div className="text-sm flex flex-row flex-wrap justify-between gap-4">
                      <div className="text-sm">
                        <p className="poppins-semibold">From:</p>{" "}
                        <p>{format(booking.dateFrom, "dd/MM/yyyy")}</p>
                      </div>
                      <div className="text-sm">
                        <p className="poppins-semibold">To:</p>{" "}
                        <p>{format(booking.dateTo, "dd/MM/yyyy")}</p>
                      </div>{" "}
                      <div className=" flex flex-col">
                        <p className="poppins-semibold">Guests:</p>
                        <p className="">{booking.guests}</p>
                      </div>
                      <div className=" flex flex-col">
                        <p className="poppins-semibold">Total sum:</p>
                        <p className="">
                          {venue.price *
                            differenceInDays(
                              parseISO(booking.dateTo),
                              parseISO(booking.dateFrom)
                            )}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm flex flex-row justify-start gap-4">
                      <div className="text-sm flex flex-col">
                        <p className="poppins-semibold ">Booked by:</p>
                      </div>
                      <Link
                        to={`/profile/${booking.customer.name}`}
                        className="flex justify-start items-center gap-3 hover:underline"
                      >
                        <img
                          src={booking.customer.avatar.url}
                          alt={booking.customer.avatar.alt}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <p className=" text-gray-600 text-sm">
                          {booking.customer.name === user.data.name
                            ? booking.customer.name + " (You)"
                            : booking.customer.name}
                        </p>
                      </Link>
                    </div>
                    <div className="text-sm flex flex-col">
                      <p className="poppins-semibold">Booking ID:</p>{" "}
                      <p>{booking.id}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}

export default SingleVenue;
