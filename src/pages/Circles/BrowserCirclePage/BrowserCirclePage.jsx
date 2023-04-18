import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchForm from "../../Search/SearchForm";

function BrowserCirclePage() {
  const { allPublicCirclesList } = useSelector((store) => store.circles);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_PUBLIC_CIRCLES",
    });
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    history.push(`/search/circles/allPublicCirclesList?term=${searchTerm}`);
  };

  return (
    <main className="content-main">
      <div align="center">
        <h1>PUBLIC CIRCLES</h1>
        <SearchForm onSearch={handleSearch} />
        <h2>JOINABLE CIRCLES BELOW</h2>
        <CircleTableView circlelist={allPublicCirclesList} isJoined={true} />
      </div>
    </main>
  );
}

export default BrowserCirclePage;
