import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneral, useProfiles } from "../store";
import VenueList from "../components/venues/VenueList";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function Dashboard() {
  const { profile, loading, error, fetchProfile } = useProfiles();
  const { user, apiKey } = useGeneral();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUsername = user?.data.name;

    if (!currentUsername) {
      navigate("/login");
      return;
    }

    fetchProfile(currentUsername, user?.data.accessToken, apiKey);
    console.log(
      "fetchProfile",
      currentUsername,
      user?.data.accessToken,
      apiKey,
      profile
    );
  }, [fetchProfile, user, navigate]);

  /*  const getVenueBookings = (venueId) => { */

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="w-full page-max-width pb-0 bg-white rounded-lg">
        <div className=" flex justify-between mb-3 p-4 flex-wrap items-center">
          <h2 className="text-2xl poppins-bold">Dashboard</h2>
          <Link
            to="./create-venue"
            className="flex py-6 items-center sm:max-w-52 gap-2 btn-primary"
          >
            <p className="">Create venue</p>
            <AddIcon />
          </Link>
        </div>
        <h3 className="text-lg poppins-semibold mx-4">Your Venues</h3>
        {profile.venues && profile.venues.length > 0 ? (
          <VenueList venues={profile.venues} />
        ) : (
          <div className="flex justify-center items-center h-40 text-gray-500">
            <p className="text-sm">No venues found</p>
          </div>
        )}
        <h3 className="text-lg poppins-semibold mb-4 mx-4">
          Bookings to Your Venues
        </h3>
        {profile.bookings && profile.bookings.length > 0 ? (
          <div className=" rounded-lg mb-4 mx-4">
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
                    <div
                      key={booking.id}
                      className="bg-white p-4 w-full rounded-md shadow-md booking-card"
                    >
                      <div className="flex gap-4">
                        <img
                          src={booking.venue.media[0]?.url || ""}
                          alt={
                            booking.venue.media[0]?.alt || booking.venue.name
                          }
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <div className="flex flex-col justify-center">
                          <div className="flex flex-col ">
                            <h4
                              title={booking.venue.name}
                              className="text-lg font-semibold"
                            >
                              {booking.venue.name
                                ? booking.venue.name.length > 12
                                  ? booking.venue.name.substring(0, 12) + "..."
                                  : booking.venue.name
                                : "No name found"}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {numberOfNights} night
                              {numberOfNights > 1 && "s"}{" "}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.guests} guests
                            </p>
                            <div className="flex items-center">
                              <p className="text-sm text-gray-500">
                                Price: {booking.venue.price} NOK / night
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
