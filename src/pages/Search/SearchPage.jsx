import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CircleTable from "../Circles/CircleTable/CircleTable";
import TableManuscriptView from "../../components/TableManuscriptView";
import SearchForm from "./SearchForm";
import Header from "../../layout/Header/Header";

function SearchPage() {
  const dispatch = useDispatch();
  const { content, type } = useParams();
  const location = useLocation();
  const { id } = useSelector((store) => store.user);
  const contentList = useSelector((store) => store[content][type]);

  // Initialize searchTerm state with value from URL search parameter
  const [searchTerm, setSearchTerm] = useState(
    () => new URLSearchParams(location.search).get("term") || ""
  );
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Define an array of types that represent a manuscript list
  const manuscriptListTypes = [
    "circleManuscriptsList",
    "publicManuscriptList",
    "writersDeskManuscriptList",
  ];

  // Determine if the current type represents a manuscript list
  const isManuscriptList = manuscriptListTypes.includes(type);

  // Get the filtered list based on the current search term
  const filteredCircles = getFilteredCircles();

  // Define a function to filter the list based on the current search term
  function getFilteredCircles() {
    const searchItem = isManuscriptList ? "title" : "name";
    return contentList.filter(
      (item) =>
        searchTerm === "" ||
        item[searchItem]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Define an array of objects with configuration for each data fetch type
  const fetchDataConfig = {
    myJoinedCircleList: {
      getDataType: "FETCH_MY_JOINED_CIRCLES",
      payload: (id) => id,
    },
    allPublicCirclesList: {
      getDataType: "FETCH_ALL_PUBLIC_CIRCLES",
    },
    circleManuscriptsList: {
      getDataType: "FETCH_CIRCLE_MANUSCRIPTS_LIST",
    },
    publicManuscriptList: {
      getDataType: "FETCH_PUBLIC_MANUSCRIPT_LIST",
    },
    writersDeskManuscriptList: {
      getDataType: "FETCH_WRITERS_DESK_LIST",
    },
  };

  // Fetch data using Redux if data is not fetched yet
  const fetchData = async () => {
    if (contentList.length === 0 && !isDataFetched) {
      const fetchConfig = fetchDataConfig[type];

      const payload =
        fetchConfig.payload && typeof fetchConfig.payload === "function"
          ? fetchConfig.payload(id)
          : fetchConfig.payload;

      dispatch({ type: fetchConfig.getDataType, payload });
      setIsDataFetched(true);
    }
  };

  // Call the fetchData function when the component mounts and some dependencies change
  useEffect(() => {
    fetchData();
  }, [contentList.length, dispatch, id, isDataFetched, type]);

  // Determine the type of the list based on the current type
  const listType = () => {
    const listTypeConfig = {
      myJoinedCircleList: "Joined Circle",
      allPublicCirclesList: "Public Circle",
      circleManuscriptsList: "Manuscripts",
      publicManuscriptList: "Public Manuscripts",
      writersDeskManuscriptList: "Writers Desk Manuscripts",
    };
    return listTypeConfig[type] || "";
  };

  // Define a function to update the search term state when a search is performed
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Determine if there are any search results
  const hasSearchResults = filteredCircles.length > 0;

  // Define a function to render search results based on the type of list being displayed
  function renderSearchResults() {
    if (!hasSearchResults) {
      return <h2>No results found</h2>;
    }
    // If the current type represents a manuscript list, display TableManuscriptView component
    if (isManuscriptList) {
      return <TableManuscriptView manuscriptlist={filteredCircles} />;
    }

    // If the current type represents a circle list, display CircleTableView component
    // return (
    //   <CircleTableView
    //     circlelist={filteredCircles}
    //     isJoined={type === "allPublicCirclesList"}
    //   />
    // );
  }

  return (
    <main className="content-main">
      <div align="center">
      <Header title={`Search ${listType()}`} />
      <SearchForm onSearch={handleSearch} />
      <h2>Search Results for "{searchTerm}"</h2>
      {renderSearchResults()}
      </div>
    </main>
  );
}

export default SearchPage;

// The above code updates the search term state when a search is performed, determines if there are any search results,
// and renders the search results based on the type of list being displayed. It also renders the SearchPage component
// with the appropriate header, search form, and search results view.
