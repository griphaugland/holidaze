import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import VenueList from "../components/venues/VenueList";
import Loader from "../components/Loader";
import { useVenues } from "../store";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CategorySlider from "../components/venues/CategorySlider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Venues() {
  useEffect(() => {
    document.title = "Venues | Holidaze";
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const { error, loading, venues, url, resetVenues, getVenues, getMoreVenues } =
    useVenues((state) => ({
      error: state.error,
      loading: state.loading,
      venues: state.venues || [], // Default to empty array
      url: state.url,
      resetVenues: state.resetVenues,
      getVenues: state.getVenues,
      getMoreVenues: state.getMoreVenues,
    }));
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      resetVenues();
      const searchQuery = query.get("q");
      if (searchQuery && searchQuery !== "All") {
        setSearch(searchQuery);
        const searchUrl = `https://v2.api.noroff.dev/holidaze/venues/search?q=${searchQuery}`;
        await getVenues(searchUrl);
      } else {
        await getVenues(
          "https://v2.api.noroff.dev/holidaze/venues/?limit=15&page=1&_owner=true"
        );
      }
    };

    fetchVenues();
  }, [location.key]); // Fetch venues on component mount and location change

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
      navigate(`?q=${search}`);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="align-top-header flex flex-col justify-center">
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
          value={search || ""}
        />
        <button
          className="arrow-move-search text-end"
          name="search button"
          type="submit"
        >
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
    </div>
  );
}

export default Venues;
