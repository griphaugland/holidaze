import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import { useGeneral } from "../store";
import { parseISO, format } from "date-fns";

function SingleBooking() {
  const { user, apiKey, isLoggedIn } = useGeneral();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
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

  useEffect(() => {
    setLoading(true);
    const url = `https://v2.api.noroff.dev/holidaze/bookings/${bookingId}?_venue=true&_customer=true`;
    getSingleBooking(url);
  }, [bookingId]);

  if (error) {
    return <div>Error loading booking details.</div>;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="align-top-header  flex flex-col justify-center">
      <div className="bg-white max-page-width shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={booking.venue.media[0].url}
            alt={booking.venue.media[0].alt}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-0 left-0 p-4 w-full h-full flex justify-end flex-col bg-black bg-opacity-50 text-white">
            <h2 className="text-2xl font-bold">{booking.venue.name}</h2>
            <p className="text-lg">{booking.venue.price} NOK /night</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-gray-700">
            <RoomOutlinedIcon />
            <span className="ml-2">
              {`${booking.venue.location.address}, ${booking.venue.location.city}, ${booking.venue.location.country}`}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Booking Details</h3>
            {/*     <p>
              <strong>From:</strong>{" "}
              {format(parseISO(booking.dateFrom), "dd/MM/yyyy")}
            </p>
            <p>
              <strong>To:</strong>{" "}
              {format(parseISO(booking.dateTo), "dd/MM/yyyy")}
            </p>*/}
            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Venue Details</h3>
            <p>{booking.venue.description}</p>
            <div className="mt-2">
              <strong>Rating:</strong>
              <StarRateSharpIcon className="text-yellow-400 ml-1" />
              {booking.venue.rating > 0
                ? booking.venue.rating
                : "No rating yet"}
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Amenities</h4>
              <ul className="list-disc list-inside">
                {booking.venue.meta.wifi && <li>WiFi</li>}
                {booking.venue.meta.parking && <li>Parking</li>}
                {booking.venue.meta.breakfast && <li>Breakfast</li>}
                {booking.venue.meta.pets && <li>Pets allowed</li>}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Customer</h3>
            <div className="flex items-center mt-2">
              <img
                src={booking.customer.avatar.url}
                alt={booking.customer.avatar.alt}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-4">
                <Link
                  to={`/profile/${booking.customer.name}`}
                  className="text-gray-600 poppins-regular hover:underline"
                >
                  {booking.customer.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Owner</h3>
            <div className="flex items-center mt-2">
              <img
                src={booking.venue.owner.avatar.url}
                alt={booking.venue.owner.avatar.alt}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-4">
                <Link
                  to={`/profile/${booking.venue.owner.name}`}
                  className="text-gray-600 poppins-regular hover:underline"
                >
                  {booking.venue.owner.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBooking;
