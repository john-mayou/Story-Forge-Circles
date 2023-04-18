import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchForm from "../../Search/SearchForm";
import Header from "../../../layout/Header/Header";

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
      <Header title={"Public Circles"} />
      <div align="center">
        <SearchForm onSearch={handleSearch} />
        <CircleTableView circlelist={allPublicCirclesList} isJoined={true} />
      </div>
    </main>
  );
}

export default BrowserCirclePage;
