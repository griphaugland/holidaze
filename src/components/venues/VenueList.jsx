import React, { useEffect, useState } from "react";
import VenueItem from "./VenueItem";

function VenueList({ venues }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);

  useEffect(() => {
    setFilteredVenues(venues);
  }, [venues]);

  return (
    <div className="venue-container relative p-4">
      {filteredVenues.map((item, index) => (
        <VenueItem key={`${item.id}-${index}`} item={item} />
      ))}
      {filteredVenues.length < 1 && (
        <h2 className="absolute text-center mt-4 text-gray-500 w-full">
          No venues found
        </h2>
      )}
    </div>
  );
}

export default VenueList;
