import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import Loader from "../components/Loader";
import { useGeneral, useProfiles } from "../store";
import VenueList from "../components/venues/VenueList";
import EditMediaButton from "../components/buttons/EditMediaButton";

function Profile() {
  const { profile, loading, error, fetchProfile } = useProfiles();
  const { user, isLoggedIn, apiKey } = useGeneral();
  const [mobile, setMobile] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
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
  }, [username, fetchProfile, user, isLoggedIn, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="w-full page-max-width p-4 pb-0 bg-white rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={profile.avatar?.url}
            alt={profile.avatar?.alt || "Avatar"}
            className="rounded-full w-24 h-24"
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">
              {profile.venueManager ? "Venue Manager" : "Venue booker"}
            </p>
          </div>
          {!mobile && profile.name === user.data.name && (
            <div className="flex items-start flex-col ml-auto gap-3">
              <EditMediaButton />
              <LogoutButton size="profile" />
            </div>
          )}
        </div>
        {mobile && profile.name === user.data.name && (
          <div className="flex items-start mb-5 flex-row flex-wrap ml-auto gap-3">
            <EditMediaButton />
            <LogoutButton size="profile" />
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-lgs font-semibold">About {profile.name}</h3>
          <div className="text-sm mt-2">
            {profile.bio || "No biography found"}
          </div>
        </div>
        {profile.venueManager && profile.venues && (
          <div className="">
            <h3 className="text-lg font-semibold">
              Venues Managed by {profile.name}
            </h3>
          </div>
        )}
      </div>
      {profile.venueManager && profile.venues && (
        <div className="page-max-width w-full">
          <VenueList venues={profile.venues} />
        </div>
      )}
    </div>
  );
}

export default Profile;
