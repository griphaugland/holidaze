import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HouseIcon from "@mui/icons-material/House";
import CabinIcon from "@mui/icons-material/Cabin";
import CastleIcon from "@mui/icons-material/Castle";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TerrainIcon from "@mui/icons-material/Terrain";
import ForestIcon from "@mui/icons-material/Forest";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import LiquorIcon from "@mui/icons-material/Liquor";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import MovieIcon from "@mui/icons-material/Movie";
import SailingIcon from "@mui/icons-material/Sailing";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { useVenues } from "../../store";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CategorySlider() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const navigate = useNavigate();
  const query = useQuery();
  const categories = [
    { id: 1, icon: <AllInclusiveIcon />, name: "All" },
    { id: 2, icon: <BeachAccessIcon />, name: "Beach" },
    { id: 3, icon: <DownhillSkiingIcon />, name: "Snow" },
    { id: 4, icon: <ForestIcon />, name: "Forest" },
    { id: 5, icon: <SailingIcon />, name: "Sea" },
    { id: 6, icon: <CastleIcon />, name: "Castle" },
    { id: 7, icon: <LocationCityIcon />, name: "City" },
    { id: 8, icon: <CabinIcon />, name: "Cabin" },
    { id: 9, icon: <WbSunnyIcon />, name: "Sunny" },
    { id: 10, icon: <TerrainIcon />, name: "Mountain" },
    { id: 11, icon: <HouseIcon />, name: "House" },
    { id: 12, icon: <GolfCourseIcon />, name: "Golf" },
    { id: 13, icon: <LiquorIcon />, name: "Drinking" },
    { id: 14, icon: <DirectionsBoatIcon />, name: "Boat" },
    { id: 15, icon: <DinnerDiningIcon />, name: "Italy" },
    { id: 16, icon: <MovieIcon />, name: "Hollywood" },
  ];

  useEffect(() => {
    const categoryQuery = query.get("q");
    const category =
      categories.find(
        (category) =>
          category.name.toLowerCase() === categoryQuery?.toLowerCase()
      ) || categories[0];
    setSelectedCategory(category.id);
    if (query.get("q") === null) {
      return;
    } else if (query.get("q").length > 0) {
      return;
    } else {
      handleCategoryClick(category);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    if (category.id === 1) {
      useVenues.getState().resetVenues();
      navigate(`?q=All`); // Update this line to use the navigate function
    } else {
      navigate(`?q=${category.name}`);
    }
  };

  return (
    <div className="slider-container">
      <div className="slider p-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${
              selectedCategory === category.id ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySlider;
