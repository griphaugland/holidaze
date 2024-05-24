import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneral, useProfiles } from "../store";
import VenueList from "../components/venues/VenueList";
import { format } from "date-fns";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Dashboard() {
  const { profile, loading, setLoading, setError, error, fetchProfile } =
    useProfiles();
  const { user, apiKey } = useGeneral();
  const [venueBookings, setVenueBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUsername = user?.data.name;

    if (!currentUsername) {
      navigate("/login");
      return;
    }

    fetchProfile(currentUsername, user?.data.accessToken, apiKey);
  }, [fetchProfile, user, navigate]);

  /* profile.venues.map((venue) => {
    getVenueBookings(venue.id);
  });
   async function getVenueBookings(venueId) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setError({ error: { statusCode: res.statusText, status: res.status } });
      }
      setLoading(false);
      setVenueBookings([...venueBookings, data.data]);
      console.log(data);
      setError(false);
    } catch (e) {
      setError({ error: { statusCode: e.statusCode, status: e.status } });
    }
  } */

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="w-full page-max-width pb-0 bg-white rounded-lg">
        <div className=" flex justify-start md:justify-between mb-3 p-4 flex-wrap items-center">
          <h2 className="text-2xl poppins-bold w-full md:w-auto">Dashboard</h2>
          <Link
            to="./create-venue"
            className="flex py-2 mt-4 items-center sm:max-w-52 gap-2 btn-primary"
          >
            <p className="">Create venue</p>
            <AddIcon />
          </Link>
        </div>
        <h3 className="text-lg poppins-semibold mx-4">Your Venues</h3>
        {profile && profile.venues && profile.venues.length > 0 ? (
          <VenueList venues={profile.venues} />
        ) : (
          <div className="flex justify-center items-center h-40 text-gray-500">
            <p className="text-sm">No venues found</p>
          </div>
        )}
        <h3 className="text-lg poppins-semibold mx-4 mt-6">
          Bookings to Your Venues
        </h3>
        {profile && profile.bookings && profile.bookings.length > 0 ? (
          <div className=" rounded-lg mb-4">
            <div className="flex flex-col booking-container gap-4">
              {profile.bookings
                .sort(
                  (a, b) =>
                    new Date(a.dateFrom).getTime() -
                    new Date(b.dateFrom).getTime()
                )
                .map((booking) => {
                  const numberOfNights = Math.ceil(
                    (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <Link
                      to={`/bookings/${booking.id}`}
                      key={booking.id}
                      className="bg-white w-full rounded-md shadow-md booking-card"
                    >
                      <div className="flex gap-4">
                        <img
                          src={booking.venue.media[0]?.url || ""}
                          alt={
                            booking.venue.media[0]?.alt || booking.venue.name
                          }
                          className=" object-cover"
                        />
                        <div className="flex flex-col justify-start p-4">
                          <div className="flex flex-col gap-4 justify-between">
                            <h4
                              title={booking.venue.name}
                              className="text-md font-semibold"
                            >
                              {booking.venue.name
                                ? booking.venue.name.length > 20
                                  ? booking.venue.name.substring(0, 20) + "..."
                                  : booking.venue.name
                                : "No name found"}
                            </h4>
                            <div className="text-xs pt-sans-regular">
                              {" "}
                              From:
                              <p className="text-xs poppins-regular text-gray-500">
                                {format(booking.dateFrom, "dd/MM/yyyy")}
                              </p>
                              To:
                              <p className="text-xs poppins-regular text-gray-500">
                                {format(booking.dateTo, "dd/MM/yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="view-booking arrow-move-booking mt-auto">
                            <ArrowForwardIcon />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 text-gray-500">
            <p className="text-sm">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
