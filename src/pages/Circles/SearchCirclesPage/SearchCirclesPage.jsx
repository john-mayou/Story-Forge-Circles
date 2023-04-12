import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchCircleForm from "../SearchCircleForm";

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

  // Set up state for the search term
  const [searchTerm, setSearchTerm] = useState(searchedTermFromQuery);

  // Filter the circle list based on the search term
  const filteredCircles = circleList.filter((circle) =>
    searchTerm === ""
      ? true
      : circle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <main className="content-main">
      <h1>Search {circleListType} Circles</h1>

      <SearchCircleForm onSearch={handleSearch} />

      {/* Search results */}
      <h2>Search Results for "{searchTerm}"</h2>

      <CircleTableView circlelist={filteredCircles} isJoined={type === 'allPublicCirclesList' ? true : false}/>
    </main>
  );
}
