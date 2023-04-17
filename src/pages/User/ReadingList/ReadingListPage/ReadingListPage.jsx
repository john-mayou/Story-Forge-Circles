import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ManuscriptListItem from "../../ManuscriptListItem";
import SearchManuscriptForm from "../../SearchManuscriptForm";

function ReadingListPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const publicManuscriptList = useSelector(
    (store) => store.manuscripts.publicManuscriptList
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_PUBLIC_MANUSCRIPT_LIST",
    });
  }, []);

  // Get the search term from the URL query parameters
  const location = useLocation();
  const searchedTermFromQuery = new URLSearchParams(location.search).get(
    "term"
  );

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Set up state for the search term
  const [searchTerm, setSearchTerm] = useState(searchedTermFromQuery);

  // Filter the circle list based on the search term
  const filteredmanuscripts = publicManuscriptList.filter(
    (manuscript) => {
      if (searchTerm === null) return publicManuscriptList;
      else
        return manuscript.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    // searchTerm === ""
    //   ? true
    //   : manuscript.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <main className="content-main">
      <h1>Reading List Page</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <SearchManuscriptForm onSearch={handleSearch} />

      {/* Displays list of publically shared Manuscripts to page */}
      {filteredmanuscripts?.map((manuscript) => {
        return (
          <div key={manuscript.id}>
            <br></br>
            <ManuscriptListItem manuscript={manuscript} />
          </div>
        );
      })}
    </main>
  );
}

export default ReadingListPage;
