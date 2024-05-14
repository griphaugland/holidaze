import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import AddToFavorites from "../components/buttons/AddToFavorite"; // Assuming there's a similar AddToFavorites component for venues
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function SingleVenue() {
  let { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
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
  }, [currentImageIndex, isMobile]);

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
          <button onClick={nextImage} className="single-venue-next-button p-3">
            <ArrowForwardIcon />
          </button>
        )}
      </div>
      <div className="md:w-1/2 md:pl-10">
        <h1 className="text-3xl mt-3 font-bold">{venue.name}</h1>
        <div>Rating {venue.rating}</div>
        <p className="mt-4 text-gray-600">{venue.description}</p>
        <div className="mt-4">
          <span className="ml-2 text-lg font-bold">{venue.price}</span>
        </div>
        <div className="mt-4 flex flex-row justify-start gap-3">
          <AddToFavorites venue={venue} />
        </div>
      </div>
    </div>
  );
}

export default SingleVenue;
