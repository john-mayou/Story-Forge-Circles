import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../../../layout/Header/Header";
import SearchForm from "../../../Search/SearchForm";
import ManuscriptList from "../../../../components/ManuscriptList";

function ReadingListPage() {
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
        <Header title={"Reading List"} />
        <SearchForm onSearch={handleSearch} />
      </div>

      <ManuscriptList manuscripts={publicManuscriptList}/>

    </main>
  );
}

export default ReadingListPage;
