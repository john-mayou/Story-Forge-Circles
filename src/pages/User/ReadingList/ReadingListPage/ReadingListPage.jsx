import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../layout/Header/Header";
import ManuscriptList from "../../../../components/ManuscriptList";
import useSearch from "../../../../hooks/useSearch";
import SearchBar from "../../../../components/SearchBar";
import { searchKeySelector } from "../../../../utils/searchUtils";

function ReadingListPage() {
  const dispatch = useDispatch();

  const publicManuscriptList = useSelector(
    (store) => store.manuscripts.publicManuscriptList
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_PUBLIC_MANUSCRIPT_LIST",
    });
  }, []);


  const { filteredData, searchTerm, setSearchTerm } = useSearch(publicManuscriptList, searchKeySelector);

  return (
    <main className="content-main">
      <div className="" align="center">
        <Header title={"Reading List"} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <ManuscriptList manuscripts={filteredData}/>

    </main>
  );
}

export default ReadingListPage;
