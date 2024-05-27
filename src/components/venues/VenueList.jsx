import React, { useEffect, useState } from "react";
import VenueItem from "./VenueItem";
import SkeletonLoader from "../skeleton/VenueSkeleton";

function VenueList({ venues }) {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate a delay for loading data
    setTimeout(() => {
      setFilteredVenues(venues);
      setLoading(false);
    }, 600); // Adjust the delay as needed
  }, [venues]);

  return (
    <div className="venue-container relative p-4">
      {loading
        ? Array.from({ length: venues.length }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        : filteredVenues.map((item, index) => (
            <VenueItem key={`${item.id}-${index}`} item={item} />
          ))}
      {filteredVenues.length < 1 && !loading && (
        <h2 className="absolute text-center mt-4 text-gray-500 w-full">
          No venues found
        </h2>
      )}
    </div>
  );
}

export default VenueList;
