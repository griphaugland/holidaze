import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import AddToFavorites from "../components/buttons/AddToFavorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

function SingleVenue() {
  let { id } = useParams();
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
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMaxWidth, setMaxWidth] = useState(window.innerWidth >= 1538);
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
    const url = `https://v2.api.noroff.dev/holidaze/venues/${id}`;
    getSingleVenue(url);
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setMaxWidth(window.innerWidth >= 1538);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const width = isMobile ? 100 : 75;
      sliderRef.current.style.transform = `translateX(-${
        currentImageIndex * width
      }vw)`;
      if (
        !isMobile &&
        !isMaxWidth &&
        currentImageIndex === venue.media.length - 1
      ) {
        setLastImage(true);
      } else {
        setLastImage(false);
      }
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
    }
  }, [currentImageIndex, isMobile]);

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
    <div className="page-max-width">
      <div className="relative">
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
            <div
              className="flex image-filter"
              ref={sliderRef}
              style={{
                width: `100vw`,
              }}
            >
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
      <div className="md:w-1/2 px-8 p-6">
        <div className="location flex  flex-row gap-2 items-center">
          <RoomOutlinedIcon />
          {venue.location.address && (
            <h2 className="pt-sans-regular text-gray-700 font-light">
              {capitalizeFirstLetter(venue.location.address)}
              {venue.location.city && (
                <span className="pt-sans-regular text-gray-700 font-light">
                  ,
                </span>
              )}
            </h2>
          )}
          {venue.location.city && (
            <>
              <h2 className="pt-sans-regular text-gray-700 font-light">
                {capitalizeFirstLetter(venue.location.city)}
                {venue.location.country && (
                  <span className="pt-sans-regular text-gray-700 font-light">
                    ,
                  </span>
                )}
              </h2>
            </>
          )}
          {venue.location.country && (
            <h2 className="pt-sans-regular text-gray-700 font-light">
              {capitalizeFirstLetter(venue.location.country)}
            </h2>
          )}
        </div>
        <h1 className="text-2xl py-2 font-bold">{venue.name}</h1>
        <span className="text-xl py-2 font-bold">{venue.price} NOK /night</span>
        <div className="maxguests py-5">
          <h2 className="text-sm font-regular">This venue offers</h2>
          <div className="facilities-overview">
            <div className="flex flex-col gap-3">
              <p className="text-gray-600">Max guests icon</p>
              <p className="text-green-600">{venue.maxGuests}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-600">Breakfas icon</p>
              {venue.meta.breakfast ? (
                <p className="text-green-600">Yes</p>
              ) : (
                <p className="text-red-600">No</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-600">Wifi icon</p>
              {venue.meta.wifi ? (
                <p className="text-green-600">Yes</p>
              ) : (
                <p className="text-red-600">No</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-600">Parking icon</p>
              {venue.meta.parking ? (
                <p className="text-green-600">Yes</p>
              ) : (
                <p className="text-red-600">No</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <p className="text-gray-600">Pets icon</p>
              {venue.meta.pets ? (
                <p className="text-green-600">Yes</p>
              ) : (
                <p className="text-red-600">No</p>
              )}
            </div>
          </div>
        </div>
        <div className="description py-5">
          <h2 className="text-sm font-regular">Description</h2>
          <p className=" text-gray-600">{venue.description}</p>
        </div>
      </div>
      <div className="md:w-1/2 px-8 p-6">
        <div className="mt-4 flex flex-row justify-start gap-3">
          <AddToFavorites venue={venue} />
        </div>
        <div>Rating {venue.rating}</div>
      </div>
    </div>
  );
}

export default SingleVenue;
