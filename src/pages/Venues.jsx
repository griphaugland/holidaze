import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VenueList from "../components/venues/VenueList";
import Loader from "../components/Loader";
import { useVenues } from "../store";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Venues() {
  const error = useVenues((state) => state.error);
  const loading = useVenues((state) => state.loading);
  const venues = useVenues((state) => state.venues);
  const url = useVenues((state) => state.url);
  const getMoreVenues = useVenues((state) => state.getMoreVenues);
  const searchVenues = useVenues((state) => state.searchVenues);

  const [search, setSearch] = useState("");

  useEffect(() => {
    useVenues.getState().getVenues(url);
  }, []);

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchVenues(search);
  };

  if (error) {
    return <Error errorResponse={error} />;
  }

  return (
    <>
      <form
        className="bg-white md:mt-6 h-12 mx-4 max-w-full md:self-center md:w-2/5 searchbar rounded-md flex flex-row items-center p-4 justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <label className="text-blue-950" htmlFor="search">
          <SearchOutlinedIcon />
        </label>
        <input
          className="w-full px-1 py-2 outline-none rounded-md placeholder-gray-400"
          placeholder="Search venues..."
          name="search"
          id="search-input"
          onChange={handleSearchValue}
          type="text"
        />
      </form>
      {loading && venues.length === 0 ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={venues.length}
          next={getMoreVenues}
          hasMore={!!url}
        >
          <VenueList venues={venues} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default Venues;
