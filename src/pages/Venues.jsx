import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VenueList from "../components/venues/VenueList";
import Loader from "../components/Loader";
import { useVenues } from "../store";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CategorySlider from "../components/venues/CategorySlider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Venues() {
  const error = useVenues((state) => state.error);
  const loading = useVenues((state) => state.loading);
  const venues = useVenues((state) => state.venues);
  const url = useVenues((state) => state.url);
  const getMoreVenues = useVenues((state) => state.getMoreVenues);
  const searchVenues = useVenues((state) => state.searchVenues);
  const resetVenues = useVenues((state) => state.resetVenues);
  const searchQuery = useVenues((state) => state.searchQuery);

  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    resetVenues();
    if (searchQuery) {
      searchVenues(searchQuery);
    } else {
      useVenues.getState().getVenues(url);
    }
  }, []);

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      const searchInput = document.getElementById("search-input");
      searchInput.focus();
      searchInput.placeholder = "Please enter a search query";
    } else {
      searchVenues(search);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
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
          placeholder="Find your vacation..."
          name="search"
          id="search-input"
          onChange={handleSearchValue}
          type="text"
          value={search}
        />
        <button className="arrow-move-search text-end" type="submit">
          <ArrowForwardIcon className="" />
        </button>
      </form>
      <CategorySlider />
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
