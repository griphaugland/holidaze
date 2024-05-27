import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGeneral } from "../store";
import { parseISO, format, differenceInDays } from "date-fns";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import Facilities from "../components/venues/Facilities";
import Modal from "../components/modal/Modal";
import useModal from "../components/modal/useModal";
import EditBookingModal from "../components/modal/modalcontent/EditBooking";
import DeleteConfirm from "../components/modal/modalcontent/DeleteConfirmation";

function SingleBooking() {
  const { isVisible, hideModal, showModal } = useModal();
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const { user, apiKey, isLoggedIn } = useGeneral();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalNights, setTotalNights] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(user.data.name);
  const [booking, setBooking] = useState({
    id: "",
    dateFrom: "",
    dateTo: "",
    guests: 0,
    venue: {
      name: "",
      description: "",
      media: [{ url: "", alt: "" }],
      price: 0,
      rating: 0,
      location: { address: "", city: "", country: "" },
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      owner: { name: "", avatar: { url: "", alt: "" } },
    },
    customer: { name: "", avatar: { url: "", alt: "" } },
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stayFinished, setStayFinished] = useState(false);
  const [stayStarted, setStayStarted] = useState(false);
  useEffect(() => {
    document.title = `Booking at ${bookingId} | Holidaze`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  async function getSingleBooking(url) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.data.accessToken}`,
          "X-Noroff-API-Key": apiKey.data.key,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError({ error: { statusCode: res.statusText, status: res.status } });
      }
      setLoading(false);
      setBooking(data.data);
      console.log(data);
    } catch (e) {
      setError({ error: { statusCode: e.statusCode, status: e.status } });
    }
  }

  const deleteBooking = async () => {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.accessToken}`,
            "X-Noroff-API-Key": apiKey.data.key,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete booking.");
      }
      navigate("../profile");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditBookingClick = () => {
    setDeleteState(false);
    setEditState(true);
    showModal();
  };

  const handleDeleteBookingClick = () => {
    setEditState(false);
    setDeleteState(true);
    showModal();
  };

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

  useEffect(() => {
    if (booking.dateFrom && booking.dateTo) {
      setTotalNights(
        differenceInDays(parseISO(booking.dateTo), parseISO(booking.dateFrom))
      );
    }
  }, [booking]);

  useEffect(() => {
    setLoading(true);
    const url = `https://v2.api.noroff.dev/holidaze/bookings/${bookingId}?_venue=true&_customer=true`;
    getSingleBooking(url);
  }, [bookingId]);

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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === booking.venue.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? booking.venue.media.length - 1 : prevIndex - 1
    );
  };

  if (error) {
    return <div>Error loading booking details.</div>;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {booking && (
        <div className="align-top-header flex flex-col justify-center">
          <div className="bg-white page-max-width md:w-full md:self-start xl:self-center flex flex-col md:flex-row">
            <div className="w-full">
              <div className="relativ w-full">
                <div className="carousel-container relative overflow-hidden">
                  <div className="carousel-inner">
                    {booking.venue.media.map((media, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        style={{
                          display:
                            index === currentImageIndex ? "flex" : "none",
                        }}
                      >
                        <img
                          src={
                            media.url ||
                            "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                          }
                          loading="lazy"
                          alt={media.alt}
                          className="min-h-72 md:max-h-96 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {booking.venue.media.length > 1 && (
                    <>
                      <button
                        name="previous image"
                        onClick={prevImage}
                        className="carousel-control-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full"
                      >
                        <ArrowBackIcon />
                      </button>
                      <button
                        name="next image"
                        onClick={nextImage}
                        className="carousel-control-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full"
                      >
                        <ArrowForwardIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="content-wrapper mx-6 my-6 md:my-3 mb-6 sm:mx-8">
                <div className="flex flex-col gap-2 justify-end items-start">
                  <h2 className="poppins-semibold tracking-wide mb-2 text-black text-xl ">
                    Venue information
                  </h2>
                  <div className="date-wrapper flex">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <div className="flex flex-row gap-2 justify-end items-end">
                        <MapsHomeWorkOutlinedIcon className="text-black" />
                        <h2 className="poppins-semibold text-black tracking-wide text-md ">
                          What
                        </h2>
                      </div>
                      <h2 className="pt-sans-bold text-black text-lg ">
                        {booking.venue.name}
                      </h2>
                      <p className="pt-sans-regular text-md text-black">
                        {booking.venue.description}
                      </p>
                      <Facilities venue={booking.venue} />
                    </div>
                  </div>
                  <div className=""></div>
                  <div className="flex flex-row gap-2 justify-end items-end">
                    <RoomOutlinedIcon className="text-black" />
                    <h2 className="poppins-semibold text-black tracking-wide text-md ">
                      Where
                    </h2>
                  </div>
                  <div className="date-wrapper mb-4 flex  gap-20">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <p className=" text-black text-md pt-sans-regular">
                        {booking.venue.location.city === null &&
                          booking.venue.location.address === null &&
                          booking.venue.location.country === null && (
                            <span className="pt-sans-regular text-gray-700">
                              Location not listed
                            </span>
                          )}
                        {booking.venue.location.address && (
                          <>
                            {capitalizeFirstLetter(
                              booking.venue.location.address
                            )}
                            {booking.venue.location.city && (
                              <span className="">{", "}</span>
                            )}
                          </>
                        )}
                        {booking.venue.location.city && (
                          <>
                            {capitalizeFirstLetter(booking.venue.location.city)}
                            {booking.venue.location.country && (
                              <span className="">{", "}</span>
                            )}
                          </>
                        )}
                        {booking.venue.location.country && (
                          <>
                            {" "}
                            {capitalizeFirstLetter(
                              booking.venue.location.country
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 justify-end items-end">
                    <PeopleOutlinedIcon className="text-black" />
                    <h2 className="poppins-semibold text-black tracking-wide text-md ">
                      Max guests
                    </h2>
                  </div>
                  <div className="date-wrapper flex mb-4 gap-20">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <p className=" text-black text-md pt-sans-regular">
                        {booking.venue.maxGuests}{" "}
                        {booking.venue.maxGuests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full mx-6 mt-8 mb-6 sm:mx-8">
              <div className="flex flex-row gap-2 justify-start items-center flex-wrap">
                <h1 className="text-2xl poppins-semibold md:w-auto mr-auto">
                  Booking Information
                </h1>
                {loggedInUser === booking.customer.name && (
                  <div className="flex flex-row gap-2 pr-12">
                    <button
                      name="edit booking"
                      onClick={handleEditBookingClick}
                      className={`btn-secondary-reverse text-sm poppins-semibold flex items-center justify-between ${
                        stayStarted || stayFinished ? "disabled-button" : ""
                      }`}
                      disabled={stayStarted || stayFinished}
                    >
                      <p>Edit</p>
                      <ArrowForwardIcon />
                    </button>
                    <button
                      name="delete booking"
                      onClick={handleDeleteBookingClick}
                      className={`btn-logout-reverse text-sm poppins-semibold flex items-center text-red-600 justify-between ${
                        stayStarted || stayFinished ? "disabled-button" : ""
                      }`}
                      disabled={stayStarted || stayFinished}
                    >
                      <p
                        className={`${
                          stayStarted || stayFinished ? "" : "text-red-600 "
                        }`}
                      >
                        Delete
                      </p>
                      <ArrowForwardIcon
                        className={`${
                          stayStarted || stayFinished ? "" : "text-red-600 "
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="location flex gap-3 items-start my-8 mt-4 flex-col pt-sans-regular text-gray-700 font-light">
                <div className="flex flex-row gap-2 justify-end items-end">
                  <CalendarMonthOutlinedIcon className="text-black" />
                  <h2 className="poppins-semibold text-black text-md tracking-wide">
                    When
                  </h2>
                </div>
                {booking.dateFrom && booking.dateTo && (
                  <div className="date-wrapper flex  gap-20">
                    <div className="flex flex-col justify-start items-start">
                      <h2 className="pt-sans-bold text-black text-sm ">From</h2>
                      <p className="pt-sans-regular text-md text-black">
                        {format(parseISO(booking.dateFrom), "dd/MM/yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col  justify-start items-start">
                      <h2 className="pt-sans-bold text-black text-sm ">To</h2>
                      <p className="pt-sans-regular text-md text-black">
                        {format(parseISO(booking.dateTo), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>
                )}
                {stayStarted && (
                  <div className="text-red-600 mt-4 max-w-72">
                    This booking has started and cannot be edited or deleted.
                  </div>
                )}
                {stayFinished && (
                  <div className="text-red-600 mt-4 text-lg max-w-72">
                    This booking has finished and cannot be edited or deleted.
                  </div>
                )}
              </div>
              <div className="location flex gap-3 items-start flex-col my-8 pt-sans-regular mb-6 font-light">
                <div className="flex flex-row gap-2 justify-end items-end">
                  <PersonOutlinedIcon className="text-black " />
                  <h2 className="poppins-semibold tracking-wide text-black text-md ">
                    Customer
                  </h2>
                </div>
                <div className="date-wrapper flex  gap-20">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    <Link
                      name={`profile of ${booking.customer.name}`}
                      to={`/profile/${booking.customer.name}`}
                      className="flex justify-start items-center gap-3 hover:underline"
                    >
                      <img
                        loading="lazy"
                        src={
                          booking.customer.avatar.url ||
                          "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                        }
                        alt={booking.customer.avatar.alt}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <p className=" text-black text-md">
                        {booking.customer.name}
                      </p>
                    </Link>
                    <a
                      name="email of customer"
                      href={`mailto:${booking.customer.email}`}
                      className="flex flex-row gap-4 justify-end items-center hover:underline"
                    >
                      <MailOutlineOutlinedIcon className="text-black" />
                      <div className=" text-md">{booking.customer.email}</div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="location flex gap-3 items-start flex-col my-8 pt-sans-regular mb-6 text-gray-700 font-light">
                <div className="flex flex-row gap-2 justify-end items-end">
                  <PeopleOutlinedIcon className="text-black" />
                  <h2 className="poppins-semibold text-black tracking-wide text-md ">
                    How many
                  </h2>
                </div>
                <div className="date-wrapper flex  gap-20">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    <p className=" text-black text-md">
                      {booking.guests}{" "}
                      {booking.guests === 1 ? "guest" : "guests"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="location flex gap-3 items-start flex-col my-8 pt-sans-regular mb-6 text-gray-700 font-light">
                <div className="flex flex-row gap-2 justify-end items-end">
                  <AttachMoneyOutlinedIcon className="text-black" />
                  <h2 className="poppins-semibold tracking-wide text-black text-md ">
                    How much
                  </h2>
                </div>
                <div className="date-wrapper flex  gap-20">
                  <div className="flex flex-col gap-2 justify-start items-start">
                    <p className=" text-black text-md">
                      {booking.venue.price} NOK / night
                    </p>
                  </div>
                </div>
              </div>
              <div className="location flex gap-3 items-start flex-col mt-6 pt-sans-regular mb-6 text-gray-700 font-light">
                <div className="flex flex-col gap-2 justify-end items-start">
                  <h2 className="poppins-semibold tracking-wide mb-2 text-black text-md ">
                    Venue owner
                  </h2>
                  <div className="date-wrapper flex">
                    <div className="flex flex-col gap-2 justify-start items-start">
                      <Link
                        name={`profile of ${booking.venue.owner.name}`}
                        to={`/profile/${booking.venue.owner.name}`}
                        className="flex justify-start items-center gap-3 hover:underline"
                      >
                        <img
                          loading="lazy"
                          src={
                            booking.venue.owner.avatar.url ||
                            "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                          }
                          alt={booking.venue.owner.avatar.alt}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <p className=" text-black text-md">
                          {booking.venue.owner.name}
                        </p>
                      </Link>
                      <a
                        name="email of venue owner"
                        href={`mailto:${booking.venue.owner.email}`}
                        className="flex flex-row gap-4 justify-end items-center hover:underline"
                      >
                        <MailOutlineOutlinedIcon className="text-black" />
                        <div className="text-black text-md">
                          {booking.venue.owner.email}
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location flex gap-3 items-start flex-col my-8 pt-sans-regular mb-6 text-gray-700 font-light">
                <div className="flex flex-col gap-2 justify-end items-start">
                  <h2 className="poppins-semibold tracking-wide text-black text-md border-b-2 border-black pb-1">
                    Total price for {totalNights === 0 ? "1" : totalNights}{" "}
                    {totalNights === 1 ? "night" : "nights"}:
                  </h2>
                  <div className="flex items-start justify-center flex-col">
                    <h2 className="pt-sans-bold tracking-wide text-black text-lg">
                      {booking.venue.price * totalNights} NOK
                    </h2>
                    <p className="pt-sans-regular text-sm">
                      Payment charged at arrival
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal isVisible={isVisible} hideModal={hideModal}>
            {editState && (
              <EditBookingModal
                booking={booking}
                isOpen={isVisible}
                onClose={hideModal}
              />
            )}
            {deleteState && (
              <DeleteConfirm
                text="booking"
                isOpen={isVisible}
                onClose={hideModal}
                onDelete={deleteBooking}
              />
            )}
          </Modal>
        </div>
      )}
    </>
  );
}

export default SingleBooking;
