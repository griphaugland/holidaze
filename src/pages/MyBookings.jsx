import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import VenueList from "../components/venues/VenueList";
import Loader from "../components/Loader";
import { useBookings, useGeneral, useProfiles } from "../store";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookingList from "../components/bookings/BookingList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MyBookings() {
  const location = useLocation();
  const query = useQuery();
  const [currentTab, setCurrentTab] = useState("upcoming");

  const { error, loading, bookings, getBookings } = useBookings();
  const { user, apiKey, isLoggedIn } = useGeneral();
  const { fetchProfile } = useProfiles();

  useEffect(() => {
    document.title = "My Bookings | Holidaze";
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user.data && user.data.name) {
        await fetchProfile(user.data.name, user.data.accessToken, apiKey);
        await getBookings(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.data.name}/bookings?_customer=true&_venue=true`,
          user.data.accessToken,
          apiKey.data.key
        );
      }
    };

    fetchBookings();
  }, [getBookings, user, apiKey]);

  useEffect(() => {
    const tab = currentTab === "upcoming" ? "upcoming" : "finished";
  }, [currentTab]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col">
        <div className="flex justify-start md:justify-between mx-4 sm:mx-8 px-0 p-4 flex-wrap items-center">
          <h2 className="text-2xl poppins-bold mr-auto w-full sm:w-auto">
            My bookings
          </h2>
          {isLoggedIn && user.data.venueManager && (
            <Link
              name="go to dashboard"
              to="/dashboard"
              className="btn-secondary-reverse ml-0 mt-4 sm:mt-0 mr-auto sm:mr-0 sm:ml-auto tracking-wide flex justify-center items-center gap-2"
            >
              Dashboard
              <ArrowForwardIcon />
            </Link>
          )}
        </div>
        {loading && bookings.length === 0 ? (
          <Loader />
        ) : (
          <div className="">
            <div className="flex gap-4 mx-4 sm:mx-8 flex-row flex-wrap my-0">
              <button
                name="upcoming"
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
                name="finished"
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
            <div className="sm:mx-4 p-4 relative">
              <BookingList bookings={bookings} tab={currentTab} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
