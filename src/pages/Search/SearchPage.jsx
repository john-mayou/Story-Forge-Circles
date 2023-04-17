import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CircleTableView from "../Circles/CircleTableView";
import TableManuscriptView from "../../components/TableManuscriptView";
import SearchForm from "./SearchForm";

function SearchPage() {
  const dispatch = useDispatch();
  const { content, type } = useParams();
  const location = useLocation();
  const { id } = useSelector((store) => store.user);
  const contentList = useSelector((store) => store[content][type]);

    // Initialize searchTerm state with value from URL search parameter
  const [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(location.search).get("term") || "");
  const [isDataFetched, setIsDataFetched] = useState(false);

    // Define an array of types that represent a manuscript list
  const manuscriptListTypes = ["circleManuscriptsList", "publicManuscriptList", "writersDeskManuscriptList"];

    // Determine if the current type represents a manuscript list
  const isManuscriptList = manuscriptListTypes.includes(type);

    // Get the filtered list based on the current search term
  const filteredCircles = getFilteredCircles();

    // Define a function to filter the list based on the current search term
  function getFilteredCircles() {
    const searchItem = isManuscriptList ? "title" : "name";
    return contentList.filter(item =>
      searchTerm === "" ||
      item[searchItem]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Fetch the data for the current type if it hasn't already been fetched
  useEffect(() => {
    if (contentList.length === 0 && !isDataFetched) {
      // Define an array of objects with configuration for each data fetch type
      const fetchDataConfig = [
        {
          type: "myJoinedCircleList",
          getDataType: "FETCH_MY_JOINED_CIRCLES",
          payload: id
        },
        {
          type: "allPublicCirclesList",
          getDataType: "FETCH_ALL_PUBLIC_CIRCLES"
        },
        {
          type: "circleManuscriptsList",
          getDataType: "FETCH_CIRCLE_MANUSCRIPTS_LIST"
        },
        {
          type: "publicManuscriptList",
          getDataType: "FETCH_PUBLIC_MANUSCRIPT_LIST"
        },
        {
          type: "writersDeskManuscriptList",
          getDataType: "FETCH_WRITERS_DESK_LIST"
        }
      ];

      // Find the configuration object that matches the current type
      const { getDataType, payload } = fetchDataConfig.find(item => item.type === type);

      // Dispatch an action to fetch the data
      dispatch({ type: getDataType, payload });
      setIsDataFetched(true);
    }
  }, [contentList.length, dispatch, id, isDataFetched, type]);

  // Determine the type of the list based on the current type
  const listType = () => {
    const listTypeConfig = {
      myJoinedCircleList: "Joined Circle",
      allPublicCirclesList: "Public Circle",
      circleManuscriptsList: "Manuscripts",
      publicManuscriptList: "Public Manuscripts",
      writersDeskManuscriptList: "Writers Desk Manuscripts"
    };
    return listTypeConfig[type] || "";
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const hasSearchResults = filteredCircles.length > 0;

  return (
    <main className="content-main">
      <h1>Search {listType()}</h1>
      <SearchForm onSearch={handleSearch} />
      <h2>Search Results for "{searchTerm}"</h2>
      {!hasSearchResults && <h2>No results found</h2>}
      {hasSearchResults && isManuscriptList ? (
        <TableManuscriptView manuscriptlist={filteredCircles} />
      ) : (
        <CircleTableView
          circlelist={filteredCircles}
          isJoined={type === "allPublicCirclesList"}
        />
      )}
    </main>
  );
}

export default SearchPage;
