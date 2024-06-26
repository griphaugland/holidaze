import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import AddToFavorites from "../components/buttons/AddToFavorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Facilities from "../components/venues/Facilities";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import ModalButton from "../components/buttons/ModalButton";
import { useBookings, useGeneral } from "../store";
import { differenceInDays, parseISO, format } from "date-fns";
import NoImageBookingList from "../components/bookings/NoImageBookingList";
import useModal from "../components/modal/useModal";
import DeleteConfirmation from "../components/modal/modalcontent/DeleteConfirmation";
import SingleVenueSkeleton from "../components/skeleton/SingleVenueSkeleton";

function SingleVenue() {
  const { user, apiKey, isLoggedIn } = useGeneral();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [currentTab, setCurrentTab] = useState("upcoming");
  const { isVisible, hideModal, showModal } = useModal();
  const [deleteState, setDeleteState] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("View Venue | Holidaze");

  useEffect(() => {
    if (user !== null) {
      setLoggedInUser(user.data.name);
    }
  }, [user]);

  let { id } = useParams();
  const { setVenueData } = useBookings();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    setVenueData(venue);
  }, [venue, setVenueData]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMaxWidth, setMaxWidth] = useState(window.innerWidth >= 1638);
  const [maxPageWidth, setMaxPageWidth] = useState(window.innerWidth >= 1280);

  const sliderRef = useRef(null);

  async function getSingleVenue(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setError({ error: { statusCode: res.statusText, status: res.status } });
      }
      setVenue(data.data);
      if (data.data.name) {
        document.title = `${data.data.name} | Holidaze`;
      }
      setLoading(false);
    } catch (e) {
      setError({ error: { statusCode: e.statusCode, status: e.status } });
      setLoading(false);
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
      setMaxPageWidth(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${
        currentImageIndex * (maxPageWidth ? 1280 : 100)
      }${maxPageWidth ? "px" : "vw"})`;
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
    }
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === venue.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? venue.media.length - 1 : prevIndex - 1
    );
  };

  const handleEditVenueClick = () => {
    sessionStorage.setItem("editVenueData", JSON.stringify(venue));
    navigate(`../dashboard/edit-venue?id=${venue.id}`);
  };

  const handleDeleteVenueClick = () => {
    setDeleteState(true);
    showModal();
  };

  const deleteVenue = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true&_owner=true`,
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
      navigate("/dashboard");
    } catch (error) {
      setError(true);
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setLoading(false);
    }
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

  const userBookingArray = venue?.bookings.filter(
    (booking) => booking.customer.name === loggedInUser
  );

  if (error) {
    return <Error errorResponse={error} />;
  }

  if (loading) {
    return <SingleVenueSkeleton venue={venue} />;
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
                width: `${venue.media.length * 100}vw`,
                maxWidth: `${venue.media.length * 1280}px`,
              }}
            >
              {venue.media.map((media, index) => (
                <img
                  loading="eager"
                  key={index}
                  src={
                    media.url === "https://source.unsplash.com/random"
                      ? "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                      : media.url ||
                        "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                  }
                  alt={media.alt}
                  className={`min-h-96 single-venue-slider-image ${
                    isMobile ? "w-full" : "w-full"
                  } object-cover object-position-center`}
                />
              ))}
            </div>
          ) : (
            <>
              {venue.media.length === 0 ? (
                <div className="flex image-filter" ref={sliderRef}>
                  <img
                    loading="eager"
                    src={
                      "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                    }
                    alt={"No image found"}
                    className={`min-h-96 single-venue-slider-image-single-image w-full object-cover object-position-center`}
                  />
                </div>
              ) : (
                <div className="flex image-filter" ref={sliderRef}>
                  <img
                    loading="eager"
                    src={
                      venue.media[0].url ===
                      "https://source.unsplash.com/random"
                        ? "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                        : venue.media[0].url ||
                          "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                    }
                    alt={venue.media[0].alt}
                    className={`min-h-96 single-venue-slider-image-single-image w-full object-cover object-position-center`}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {venue.media.length > 1 && (
          <>
            <button
              name="next image"
              onClick={nextImage}
              className={`single-venue-next-button p-3 ${
                currentImageIndex < venue.media.length - 1 ? "" : "hidden"
              }`}
            >
              <ArrowForwardIcon />
            </button>
            <button
              name="prev image"
              onClick={prevImage}
              className={`single-venue-prev-button p-3 ${
                currentImageIndex > 0 ? "" : "hidden"
              }`}
            >
              <ArrowBackwardIcon />
            </button>
          </>
        )}
      </div>
      <div className="info-wrapper w-screen flex-row flex flex-wrap">
        <div className="md:w-1/2 px-4 sm:px-8 p-6">
          <div
            className={`location flex gap-3 items-center flex-row pt-sans-regular text-gray-700 font-light`}
          >
            <RoomOutlinedIcon />
            <h2 className="pt-sans-regular text-gray-700 font-light tracking-wide">
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
          <h1 className="text-2xl py-2 font-bold tracking-wide">
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
                <ModalButton text="Check availability" venue={venue} />
              </div>
              {loggedInUser === venue.owner.name && (
                <div className="w-full py-4 pb-0 justify-start">
                  <button
                    name="edit venue"
                    onClick={handleEditVenueClick}
                    className={`btn-secondary-reverse text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p>Edit venue</p>
                    <ArrowForwardIcon />
                  </button>

                  <button
                    name="delete venue"
                    onClick={handleDeleteVenueClick}
                    className={`btn-logout-reverse mt-4 text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p className="text-red-600">Delete</p>
                    <ArrowForwardIcon className="text-red-600" />
                  </button>
                </div>
              )}
            </>
          )}
          <div className="maxguests pt-5 md:py-5">
            <h2 className="text-lg font-regula tracking-wide">
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
                  <p className="font-bold poppins-semibold">{venue.rating}</p>
                </div>
              )}
              {venue.rating === 0 && (
                <div
                  title={`This venue is yet to be rated`}
                  className="p-3 min-w-40 flex flex-row justify-start items-end gap-3"
                >
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className="text-gray-400 pt-sans-regular">No rating yet</p>
                </div>
              )}
              <AddToFavorites venue={venue} size="large" />
            </div>
          )}
          <div className="description pt-0 py-0 sm:py-5">
            <h2 className="text-lg font-regular tracking-wide">Description</h2>
            <p className="py-2 text-gray-600 text-sm">
              {venue.description ? venue.description : "No description found"}
            </p>
          </div>
          {/* Profile Section */}
          {venue.owner && (
            <div className="profile-section flex flex-col mt-6">
              <h2 className="text-md font-regular tracking-wide">
                Venue owner
              </h2>
              {isLoggedIn ? (
                <div className="py-2 flex justify-between">
                  <Link
                    name={`click to go to ${venue.owner.name}'s profile`}
                    to={`/profile/${venue.owner.name}`}
                    className="flex justify-start items-center gap-3 hover:underline"
                  >
                    <img
                      loading="eager"
                      src={
                        venue.owner.avatar.url ||
                        "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                      }
                      alt={venue.owner.avatar.alt}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <p className="text-gray-600 text-sm">
                      {user && venue.owner.name === loggedInUser
                        ? venue.owner.name + " (You)"
                        : venue.owner.name}
                    </p>
                  </Link>
                </div>
              ) : (
                <div className="py-2 flex justify-between">
                  <div className="flex justify-start items-center gap-3">
                    <img
                      loading="eager"
                      src={
                        venue.owner.avatar.url ||
                        "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                      }
                      alt={venue.owner.avatar.alt}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <p className="text-gray-600 text-sm">
                      {user && venue.owner.name === loggedInUser
                        ? venue.owner.name + " (You)"
                        : venue.owner.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="md:w-1/2 px-4 sm:px-8 p-0 pb-6">
            <div className="flex flex-row justify-end items-end w-full pt-4 px-8 p-6 pb-0">
              {venue.rating > 0 && (
                <div className="p-3 min-w-40 flex flex-row justify-end items-end gap-3">
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className="font-bold poppins-semibold">{venue.rating}</p>
                </div>
              )}
              {venue.rating === 0 && (
                <div className="p-3 min-w-40 flex flex-row justify-end items-end gap-3">
                  <StarRateSharpIcon className="text-yellow-400" />
                  <p className="text-gray-400 pt-sans-regular">No rating yet</p>
                </div>
              )}
              <div className="flex min-w-40 flex-row justify-start gap-3">
                <AddToFavorites venue={venue} size="large" />
              </div>
            </div>
            <div className="button-container flex flex-col justify-start w-full">
              <div className="w-full py-4 pb-0 flex justify-end">
                <ModalButton text="Check availability" venue={venue} />
              </div>
              {user && loggedInUser === venue.owner.name && (
                <div className="w-full py-4 pb-0 gap-2 flex justify-end">
                  <button
                    name="edit venue"
                    onClick={handleEditVenueClick}
                    className={`btn-secondary-reverse text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p>Edit venue</p>
                    <ArrowForwardIcon />
                  </button>
                  <button
                    name="delete venue"
                    onClick={handleDeleteVenueClick}
                    className={`btn-logout-reverse text-sm poppins-semibold flex items-center justify-between`}
                  >
                    <p className="text-red-600">Delete</p>
                    <ArrowForwardIcon className="text-red-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {user &&
          loggedInUser === venue.owner.name &&
          venue.bookings.length > 0 && (
            <div className="bookings-section mb-6 px-4 sm:px-8 w-full">
              <h2 className="text-lg font-regular tracking-wide">
                Bookings made to this venue ({venue.bookings.length}):
              </h2>
              <div className="flex gap-4 flex-row justify-start flex-wrap my-4">
                <button
                  name="upcoming bookings"
                  onClick={() => setCurrentTab("upcoming")}
                  className={`btn tracking-wide ${
                    currentTab === "upcoming"
                      ? "select-primary"
                      : "select-secondary"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  name="finished bookings"
                  onClick={() => setCurrentTab("finished")}
                  className={`btn tracking-wide ${
                    currentTab === "finished"
                      ? "select-primary"
                      : "select-secondary"
                  }`}
                >
                  Finished
                </button>
              </div>
              <NoImageBookingList bookings={venue.bookings} tab={currentTab} />
            </div>
          )}
      </div>
      <DeleteConfirmation
        text="venue"
        isOpen={isVisible && deleteState}
        onClose={hideModal}
        onDelete={deleteVenue}
      />
    </div>
  );
}

export default SingleVenue;
