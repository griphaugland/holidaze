import React, { useEffect, useState } from "react";
import VenueItem from "./VenueItem";
import SkeletonLoader from "../skeleton/VenueSkeleton";
import { useVenues } from "../../store";

function VenueList({ venues }) {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isFetchingMore } = useVenues();

  useEffect(() => {
    if (!isFetchingMore) {
      setLoading(true);
    }
    // Set a delay for loading data
    setFilteredVenues(venues);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
