import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchCircleForm from "../SearchCircleForm";

export default function SearchCirclesPage() {
  // Get the 'type' parameter from the URL
  const { type } = useParams();
  // Set up state for checking whether the data has been fetched or not
  const [isDataFetched, setIsDataFetched] = useState(false);

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

      {/* Search results */}
      <h2>Search Results for "{searchTerm}"</h2>

      {circleList.length === 0 ? <h2>No results found</h2> :
      <>
      {type !== "circleManuscriptsList" ? (
        <CircleTableView
          circlelist={filteredCircles}
          isJoined={type === "allPublicCirclesList" ? true : false}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {filteredCircles?.map((manuscript) => (
              <tr key={manuscript?.id}>
                <td>{manuscript?.author}</td>
                <td>{manuscript?.title}</td>
                <td>{manuscript?.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </>}
    </main>
  );
}
