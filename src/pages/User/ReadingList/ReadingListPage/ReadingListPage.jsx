import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ManuscriptListItem from "../../ManuscriptListItem";
import SearchForm from "../../../Search/SearchForm";

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


  const handleSearch = (searchTerm) => {
    history.push(`/search/manuscripts/publicManuscriptList?term=${searchTerm}`);
  };

  return (
    <main className="content-main">
      <div align="center">
      <h1>Reading List Page</h1>
      <h2>Welcome, {user.username}!</h2>

      <SearchForm onSearch={handleSearch} />
      </div>

      <div className="ManuscriptListHeader">
        <h1 className='headers' > Title</h1>
        <h1 className='headers'> Author</h1>
        <h1 className='headers'> Preview</h1>
      </div>

      {/* Displays list of publically shared Manuscripts to page */}
      {publicManuscriptList?.map((manuscript) => {
        return (
          <>
          <br></br>
          <div key={manuscript.id}>
            <ManuscriptListItem manuscript={manuscript} />
          </div>
          </>
        );
      })}
    </main>
  );
}

export default ReadingListPage;
