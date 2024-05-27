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
  const { isVenueManager, fetchProfile } = useProfiles();

  useEffect(() => {
    document.title = "My Bookings | Holidaze";
    window.scrollTo(0, 0);
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
        <div className="flex justify-start md:justify-between mx-8 px-0 p-4 flex-wrap items-center">
          <h2 className="text-2xl poppins-bold w-full md:w-auto">
            My bookings
          </h2>
        </div>
        {loading && bookings.length === 0 ? (
          <Loader />
        ) : (
          <div className="">
            <div className="flex gap-4 mx-8 flex-row flex-wrap my-0">
              <button
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
                onClick={() => setCurrentTab("finished")}
                className={`btn tracking-wide ${
                  currentTab === "finished"
                    ? "select-primary"
                    : "select-secondary"
                }`}
              >
                Finished
              </button>
              {isLoggedIn && isVenueManager && (
                <Link
                  to="/dashboard"
                  className="btn select-secondary-link dashboard-link tracking-wide flex justify-center items-center gap-2"
                >
                  Dashboard
                  <ArrowForwardIcon
                    style={{ width: "0.9rem", height: "0.9rem" }}
                  />
                </Link>
              )}
            </div>
            <div className="sm:mx-4 p-4">
              <BookingList bookings={bookings} tab={currentTab} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
