import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useVenues } from "../../store";

function AddToFavorite({ venue }) {
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

  return (
    <button
      onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
      className="favorite-button"
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </button>
  );
}

export default AddToFavorite;
