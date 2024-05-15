import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useVenues } from "../../store";

function AddToFavorite({ venue, size }) {
  const favorites = useVenues((state) => state.favorites);
  const addToFavorites = useVenues((state) => state.addToFavorites);
  const removeFromFavorites = useVenues((state) => state.removeFromFavorites);

  useEffect(() => {
    const previousData = localStorage.getItem("favorites");
    if (previousData) {
      const parsedData = JSON.parse(previousData);
    }
  }, [addToFavorites, removeFromFavorites, venue]);

  function handleRemoveFromFavorites() {
    removeFromFavorites(venue);
    const updatedFavorites = favorites.filter((item) => item.id !== venue.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function handleAddToFavorites() {
    addToFavorites(venue);
    const updatedFavorites = [...favorites, venue];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  const isFavorite = favorites.find((item) => item.id === venue.id);
  if (size === "large") {
    return (
      <button
        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
        className="favorite-button   p-3 min-w-40 flex flex-row justify-end items-end gap-4"
      >
        {isFavorite ? (
          <>
            <FavoriteIcon className="text-red-400" />
            <p className="text-gray-400 pt-sans-regular">In favorites</p>
          </>
        ) : (
          <>
            <FavoriteBorderIcon className="text-red-400" />
            <p className="text-gray-400 pt-sans-regular">Add favorite</p>
          </>
        )}
      </button>
    );
  } else {
    return (
      <button
        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
        className="favorite-button"
      >
        {isFavorite ? (
          <FavoriteIcon className="text-red-400" />
        ) : (
          <FavoriteBorderIcon className="text-red-400" />
        )}
      </button>
    );
  }
}

export default AddToFavorite;
