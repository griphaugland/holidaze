import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";
import Loader from "../components/Loader";
import { useGeneral, useProfiles } from "../store";

function Profile() {
  const { profile, loading, error, fetchProfile } = useProfiles();
  const { user, isLoggedIn, apiKey } = useGeneral();
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        <h1 className="text-2xl">Profile</h1>
        {profile && (
          <div className="flex flex-col gap-4">
            <div>
              <img
                src={profile.avatar?.url}
                alt={profile.avatar?.alt || "Avatar"}
                className="rounded-full w-24 h-24"
              />
              <img
                src={profile.banner?.url}
                alt={profile.banner?.alt || "Avatar"}
                className=" w-24 h-24"
              />
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              <p>{profile.bio}</p>
              <div>
                <h3>Venues Managed: {profile._count.venues}</h3>
                <h3>Bookings: {profile._count.bookings}</h3>
              </div>
            </div>
          </div>
        )}
        {profile?.name === user?.data.name && <LogoutButton />}
      </div>
    </div>
  );
}

export default Profile;
