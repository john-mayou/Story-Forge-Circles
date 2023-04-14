import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchCircleForm from "../SearchCircleForm";

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
    history.push(`/search-circles/allPublicCirclesList?term=${searchTerm}`);
  };

  return (
    <main className="content-main">
      <h1>PUBLIC CIRCLES</h1>
      <SearchCircleForm onSearch={handleSearch} />
      <p>JOINABLE CIRCLES BELOW</p>
      <CircleTableView circlelist={allPublicCirclesList} isJoined={true} />
    </main>
  );
}

export default BrowserCirclePage;
