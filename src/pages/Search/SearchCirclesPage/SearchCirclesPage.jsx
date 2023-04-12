import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CircleTableView from "../../../components/CircleTableView";

export default function SearchCirclesPage() {
  // Get the 'type' parameter from the URL
  const { type } = useParams();

  // Set up Redux
  const dispatch = useDispatch();
  const circleList = useSelector((store) => store.circles[type]);
  const { id } = useSelector((store) => store.user);

  // Get the search term from the URL query parameters
  const location = useLocation();
  const searchedTermFromQuery = new URLSearchParams(location.search).get(
    "term"
  );

  // Set up state for the search input and search term
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(searchedTermFromQuery);

  // Filter the circle list based on the search term
  const filteredCircles = circleList.filter((circle) =>
    searchTerm === ""
      ? true
      : circle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the search button click event
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  // Handle the search input key press event
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput);
    }
  };

  // Fetch the circle data if it hasn't already been fetched
  useEffect(() => {
    if (circleList.length === 0) {
      let getDataType;
      let payload;
      switch (type) {
        case "myJoinedCircleList":
          getDataType = "FETCH_MY_JOINED_CIRCLES";
          payload = id;
          break;
        case "allPublicCirclesList":
          getDataType = "FETCH_ALL_PUBLIC_CIRCLES";
          break;
      }
      dispatch({ type: getDataType, payload });
    }
  }, [type, circleList]);

  // Determine the type of the circle list based on the URL parameter.
  const circleListType = type === "myJoinedCircleList" ? "Joined" : "Public";

  return (
    <main className="content-main">
      <h1>Search {circleListType} Circles</h1>

      {/* Search input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by circle name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      {/* Search button */}
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>

      {/* Search results */}
      <h2>Search Results for "{searchTerm}"</h2>

      <CircleTableView circlelist={filteredCircles} isJoined={type === 'allPublicCirclesList' ? true : false}/>
    </main>
  );
}
