import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import AddToFavorites from "../components/buttons/AddToFavorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Facilities from "../components/venues/Facilities";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";

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
          <div className="location flex  flex-row gap-2 items-center">
            <RoomOutlinedIcon />
            {venue.location.city === null &&
              venue.location.address === null &&
              venue.location.country === null && (
                <span className="pt-sans-regular text-gray-700 font-light">
                  Location not listed
                </span>
              )}
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
          <span className="text-xl py-2">{venue.price} NOK /night</span>
          <div className="maxguests py-5">
            <h2 className="text-sm font-regular">This venue offers</h2>
            <Facilities venue={venue} />
          </div>
          <div className="description pt-0 py-5">
            <h2 className="text-sm font-regular">Description</h2>
            <p className="py-2 text-gray-600 text-sm">
              {venue.description ? venue.description : "No description found"}
            </p>
          </div>
        </div>
        <div className=" flex flex-col justify-start items-end md:w-1/2 px-8 p-6">
          <div className="mt-4 flex flex-row justify-start gap-3">
            <AddToFavorites venue={venue} />
          </div>
          <div>
            <StarRateSharpIcon className="tet-" /> {venue.rating}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVenue;
