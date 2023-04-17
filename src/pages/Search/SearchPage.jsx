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
  const [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(location.search).get("term") || "");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const manuscriptListTypes = ["circleManuscriptsList", "publicManuscriptList", "writersDeskManuscriptList"];
  const isManuscriptList = manuscriptListTypes.includes(type);
  const filteredCircles = getFilteredCircles();

  function getFilteredCircles() {
    const searchItem = isManuscriptList ? "title" : "name";
    return contentList.filter(item =>
      searchTerm === "" ||
      item[searchItem]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  useEffect(() => {
    if (contentList.length === 0 && !isDataFetched) {
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
      const { getDataType, payload } = fetchDataConfig.find(item => item.type === type);
      dispatch({ type: getDataType, payload });
      setIsDataFetched(true);
    }
  }, [contentList.length, dispatch, id, isDataFetched, type]);

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
