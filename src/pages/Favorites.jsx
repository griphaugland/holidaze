import React, { useEffect } from "react";

function Favorites() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="align-top-header  flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        Favorites
      </div>
    </div>
  );
}

export default Favorites;
