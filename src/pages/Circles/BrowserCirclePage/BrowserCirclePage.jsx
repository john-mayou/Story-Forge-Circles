import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTableView from "../../../components/CircleTableView";

function BrowserCirclePage() {
  const { allPublicCirclesList } = useSelector((store) => store.circles);

  const dispatch = useDispatch();
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");

  useEffect(() => {
    dispatch({
      type: "FETCH_ALL_PUBLIC_CIRCLES",
    });
  }, [dispatch]);

  const handleSearch = () => {
    history.push(`/search-circles/allPublicCirclesList?term=${searchTerm}`);
  };

  //the "Enter" key (keyCode 13)
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleCreateCircle = () => {
    dispatch({
      type: "CREATE_NEW_CIRCLE",
      payload: {
        name: circleName,
        description: circleDescription,
        ownerId: id,
      },
    });

    // hide the modal and clear the input values
    setShowModal(false);
    setCircleName("");
    setCircleDescription("");
  };

  return (
    <main className="content-main">
      <h1>PUBLIC CIRCLES</h1>

      <input
        type="text"
        className="search-joinable-circles"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn-joinable-circle" onClick={handleSearch}>
        search!
      </button>
      <p>JOINABLE CIRCLES BELOW</p>
      <CircleTableView circlelist={allPublicCirclesList} isJoined={true}/>
    </main>
  );
}

export default BrowserCirclePage;
