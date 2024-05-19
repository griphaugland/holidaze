import React, { useEffect } from "react";
import LogoutButton from "../components/buttons/LogoutButton";
import { useVenues } from "../store";
import Login from "./Login";
function Profile() {
  const { isLoggedin } = useVenues();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="align-top-header">
      <h1>Profile</h1>
      <p>Profile page</p>
      <LogoutButton
        onClick={() => {
          window.href = "/login";
        }}
      />
    </div>
  );
}

export default Profile;
