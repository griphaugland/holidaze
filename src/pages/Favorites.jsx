import React, { useEffect } from "react";
import { useGeneral } from "../store";
import VenueList from "../components/venues/VenueList";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Favorites() {
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useGeneral();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Favorites | Holidaze";
  }, []);
  const handleClearFavorites = () => {
    clearFavorites();
  };

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        <div className="flex justify-between  flex-wrap gap-2 md:justify-between mx-4 md:mx-8 px-0 p-4  items-center">
          <h1 className="text-2xl poppins-bold sm:w-auto">
            Favorites ({favorites.length})
          </h1>
          <button
            name="clear favorites button"
            onClick={handleClearFavorites}
            disabled={favorites.length === 0}
            className="btn-secondary "
          >
            <p>
              {favorites.length === 0
                ? "No favorites to clear"
                : "Clear all favorites"}
            </p>

            <DeleteOutlinedIcon className="clear-icon text-red-600" />
          </button>
        </div>
        <VenueList venues={favorites} />
      </div>
    </div>
  );
}

export default Favorites;
