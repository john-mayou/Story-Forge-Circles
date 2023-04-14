import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchCircleForm from "../SearchCircleForm";
import CircleTableManuscriptView from "../CircleTableManuscriptView";

export default function SearchCirclesPage() {
  const dispatch = useDispatch();
  const { type } = useParams();
  const location = useLocation();
  const { id } = useSelector((store) => store.user);
  const circleList = useSelector((store) => store.circles[type]);
  const searchedTermFromQuery = new URLSearchParams(location.search).get(
    "term"
  );

  const [searchTerm, setSearchTerm] = useState(searchedTermFromQuery);
  const hasSearchResults = circleList.length !== 0;
  const isManuscriptList = type === "circleManuscriptsList";
  const [isDataFetched, setIsDataFetched] = useState(false);
  
  // Filter the circle list based on the search term
  const getFilteredCircles = () => {
    let searchItem = "name";
    if (type === "circleManuscriptsList") {
      searchItem = "title";
    }
    return circleList?.filter((item) =>
      searchTerm === ""
        ? true
        : item[searchItem].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCircles = getFilteredCircles();

  // Fetch the circle data if it hasn't already been fetched
  useEffect(() => {
    if (circleList.length === 0 && !isDataFetched) {
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
        case "circleManuscriptsList":
          getDataType = "FETCH_CIRCLE_MANUSCRIPTS_LIST";
          break;
      }
      dispatch({ type: getDataType, payload });
      setIsDataFetched(true);
    }
  }, [type, circleList.length, id, isDataFetched]);

  // Determine the type of the circle list based on the URL parameter.
  const circleListType = () => {
    switch (type) {
      case "myJoinedCircleList":
        return "Joined";
      case "allPublicCirclesList":
        return "Public";
      case "circleManuscriptsList":
        return "Manuscript";
      default:
        break;
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <main className="content-main">
      <h1>Search {circleListType()} Circles</h1>
      <SearchCircleForm onSearch={handleSearch} />
      <h2>Search Results for "{searchTerm}"</h2>
      {!hasSearchResults && <h2>No results found</h2>}
      {hasSearchResults && (
        <>
          {!isManuscriptList ? (
            <CircleTableView
              circlelist={filteredCircles}
              isJoined={type === "allPublicCirclesList"}
            />
          ) : (
            <CircleTableManuscriptView manuscriptlist={filteredCircles} />
          )}
        </>
      )}
    </main>
  );
}
