import React, { useEffect } from "react";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="align-top-header">Profile</div>;
}

export default Profile;
