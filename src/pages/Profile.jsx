import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import Loader from "../components/Loader";
import { useGeneral, useProfiles } from "../store";
import VenueList from "../components/venues/VenueList";
import EditMediaButton from "../components/buttons/EditMediaButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookingList from "../components/bookings/BookingList";

function Profile() {
  const { profile, loading, error, fetchProfile } = useProfiles();
  const { user, isLoggedIn, apiKey } = useGeneral();
  const [mobile, setMobile] = useState(false);
  const [view, setView] = useState("bookings");
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isOwnProfile = !username || profile.name === user?.data.name;

  useEffect(() => {
    if (profile.name) {
      document.title = `${profile.name} | Holidaze`;
    } else {
      document.title = "Profile | Holidaze";
    }
  }, [profile.name]);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const currentUsername = username || user?.data.name;

    if (!currentUsername) {
      navigate("/login");
      return;
    }

    fetchProfile(currentUsername, user?.data.accessToken, apiKey);

    if (isOwnProfile) {
      if (profile.venueManager) {
        setView("bookings");
      } else {
        setView("bookings");
      }
    } else {
      setView("venues");
    }
  }, [
    username,
    fetchProfile,
    user,
    isLoggedIn,
    navigate,
    location.key,
    profile.venueManager,
    isOwnProfile,
  ]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="w-full page-max-width p-4 pb-0 bg-white rounded-lg">
        <div className="flex items-start sm:items-center gap-4 sm:flex-row flex-col mb-6 mx-4">
          <img
            loading="lazy"
            src={
              profile.avatar?.url ||
              "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
            }
            alt={profile.avatar?.alt || "Avatar"}
            className="rounded-full w-24 h-24 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">
              {profile.venueManager ? "Venue Manager" : "Venue booker"}
            </p>
          </div>
          {!mobile && isOwnProfile && (
            <div className="flex items-start flex-row ml-auto flex-wrap gap-3">
              {profile.venueManager && (
                <Link
                  name="go to dashboard"
                  to="/dashboard"
                  className="btn btn-secondary-reverse poppins-semibold tracking-wide flex justify-center items-center gap-2"
                >
                  Dashboard
                  <ArrowForwardIcon />
                </Link>
              )}
              <EditMediaButton profile={profile} />
              <LogoutButton size="profile" />
            </div>
          )}
        </div>
        {mobile && isOwnProfile && (
          <div className="flex items-start mb-5 flex-row flex-wrap ml-4 gap-3">
            {profile.venueManager && (
              <Link
                name="go to dashboard"
                to="/dashboard"
                className="btn btn-secondary-reverse poppins-semibold tracking-wide flex justify-center items-center gap-2"
              >
                Dashboard
                <ArrowForwardIcon />
              </Link>
            )}
            <EditMediaButton />
            <LogoutButton size="profile" />
          </div>
        )}
        <div className="mb-6 px-5">
          <h3 className="text-lgs font-semibold">About {profile.name}</h3>
          <div className="text-sm mt-2">
            {profile.bio || "No biography found"}
          </div>
        </div>
        {profile.venueManager && isOwnProfile && (
          <div className="flex gap-4 px-4 mb-4 flex-row profile-mobile">
            <button
              name="bookings"
              onClick={() => setView("bookings")}
              className={`btn tracking-wide ${
                view === "bookings" ? "select-primary" : "select-secondary"
              }`}
            >
              Bookings
            </button>
            <button
              name="venues"
              onClick={() => setView("venues")}
              className={`btn tracking-wide ${
                view === "venues" ? "select-primary" : "select-secondary"
              }`}
            >
              Venues
            </button>
          </div>
        )}
        {!profile.venueManager && isOwnProfile && (
          <div className="flex gap-4 mx-4">
            <button
              name="bookings"
              onClick={() => setView("bookings")}
              className={`btn ${
                view === "bookings" ? "select-primary" : "select-secondary"
              }`}
            >
              Bookings
            </button>
          </div>
        )}
        {!isOwnProfile && (
          <div className="mx-4 flex gap-4">
            <button
              name="venues"
              onClick={() => setView("venues")}
              className={`btn ml-1 ${
                view === "venues" ? "select-primary" : "select-secondary"
              }`}
            >
              Venues
            </button>
          </div>
        )}
      </div>
      {profile.venueManager && view === "venues" && (
        <div className="page-max-width pt-0 w-full">
          {profile.venues && profile.venues.length > 0 ? (
            <VenueList venues={profile.venues} />
          ) : (
            <div className="flex justify-center items-center h-40 text-gray-500">
              <p className="text-sm">No venues found</p>
            </div>
          )}
        </div>
      )}
      {view === "bookings" && isOwnProfile && (
        <div className="page-max-width w-full">
          {profile.bookings && profile.bookings.length > 0 ? (
            <div className="sm:mx-4 p-4 pt-0">
              <BookingList bookings={profile.bookings} tab="all" />
            </div>
          ) : (
            <div className="flex justify-center items-center h-40 text-gray-500">
              <p className="text-sm">No bookings found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
