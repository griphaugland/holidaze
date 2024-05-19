import React, { useEffect } from "react";

function Favorites() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="align-top-header">Favorites</div>;
}

export default Favorites;
