import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneral, useProfiles } from "../store";
import VenueList from "../components/venues/VenueList";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BookingList from "../components/bookings/BookingList";
import Error from "./Error";

function Dashboard() {
  const { profile, loading, setLoading, setError, error, fetchProfile } =
    useProfiles();
  const { user, apiKey } = useGeneral();
  const [venueBookings, setVenueBookings] = useState([]);
  const [currentTab, setCurrentTab] = useState("upcoming");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUsername = user?.data.name;

    if (!currentUsername) {
      navigate("/login");
      return;
    }

    fetchProfile(currentUsername, user?.data.accessToken, apiKey);

    async function getBookingDetails(bookingId) {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/bookings/${bookingId}?_venue=true&_customer=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.data.accessToken}`,
              "X-Noroff-API-Key": apiKey.data.key,
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            `Failed to fetch booking ${bookingId}: ${res.statusText}`
          );
        }
        return data;
      } catch (error) {
        console.error(error);
        setError({
          error: { statusCode: error.statusCode, status: error.status },
        });
        return null;
      }
    }

    async function getVenueBookings(venueId) {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`
        );
        const data = await res.json();
        if (!res.ok) {
          setError({
            error: { statusCode: res.statusText, status: res.status },
          });
        } else {
          const bookingDetailsPromises = data.data.bookings.map((booking) =>
            getBookingDetails(booking.id)
          );
          const bookingDetails = await Promise.all(bookingDetailsPromises);
          return bookingDetails.filter((booking) => booking);
        }
      } catch (e) {
        setError({ error: { statusCode: e.statusCode, status: e.status } });
        return [];
      }
    }

    async function loadAllBookings() {
      setLoading(true);
      try {
        const allBookings = [];
        if (profile.venues) {
          for (const venue of profile.venues) {
            const venueBookings = await getVenueBookings(venue.id);
            allBookings.push(...venueBookings);
          }
        }
        setVenueBookings(allBookings);
      } catch (error) {
        console.error("Error loading bookings", error);
      } finally {
        setLoading(false);
      }
    }

    if (profile && profile.venues) {
      loadAllBookings();
    }
  }, [fetchProfile, user, navigate]);
  useEffect(() => {
    document.title = "Dashboard | Holidaze";
  }),
    [];

  if (loading) {
    return <Loader />;
  }
  if (error && Object.keys(error).length > 0) {
    return <Error errorFromProps={error} />;
  }

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="w-full page-max-width pb-0 bg-white rounded-lg">
        <div className="flex justify-start md:justify-between mb-3 mx-8 px-0 flex-wrap items-center">
          <h2 className="text-2xl poppins-bold w-full md:w-auto">Dashboard</h2>
          <Link
            to="./create-venue"
            className="flex py-2 mt-4 items-center sm:max-w-52 gap-2 btn-primary"
          >
            <p>Create venue</p>
            <AddIcon />
          </Link>
        </div>
        <h3 className="text-lg poppins-semibold mx-8">Your Venues</h3>
        {profile && profile.venues && profile.venues.length > 0 ? (
          <VenueList venues={profile.venues} />
        ) : (
          <div className="flex justify-center items-center h-40 text-gray-500">
            <p className="text-sm">No venues found</p>
          </div>
        )}
        <h3 className="text-lg poppins-semibold mx-8 mt-6">
          Bookings to Your Venues
        </h3>
        <div className="flex gap-4 mx-8 flex-row flex-wrap my-3 mt-6">
          <button
            name="upcoming"
            onClick={() => setCurrentTab("upcoming")}
            className={`btn tracking-wide ${
              currentTab === "upcoming" ? "select-primary" : "select-secondary"
            }`}
          >
            Upcoming
          </button>
          <button
            name="finished"
            onClick={() => setCurrentTab("finished")}
            className={`btn tracking-wide ${
              currentTab === "finished" ? "select-primary" : "select-secondary"
            }`}
          >
            Finished
          </button>
        </div>
        {venueBookings.length > 0 ? (
          <div className="rounded-l mx-8 mb-4">
            <BookingList
              bookings={venueBookings}
              tab={currentTab}
              from="dashboard"
            />
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
