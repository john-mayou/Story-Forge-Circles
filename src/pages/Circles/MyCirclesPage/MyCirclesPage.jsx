import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MyCirclesPage() {
  const { id, username } = useSelector((store) => store.user);
  const { myJoinedCircleList, myCreatedCircleList } = useSelector(
    (store) => store.circles
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_JOINED_CIRCLES",
      payload: id,
    });

    dispatch({
      type: "FETCH_MY_CREATED_CIRCLES",
      payload: id,
    });
  }, [id, dispatch]);

  const handleSearch = () => {
    history.push(`/search-circles/myJoinedCircleList?term=${searchTerm}`);
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
      <h1>My Circles</h1>

      <h2>Joined Circles</h2>
      <button
        className="browse-joinable-btn"
        onClick={() => history.push(`/circles-browser`)}
      >
        Browser Circle
      </button>
      <input
        type="text"
        className="search-joined-circles"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn-joined-circle" onClick={handleSearch}>
        search!
      </button>
      <p>JOINED CIRCLES BELOW</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {myJoinedCircleList.map((circle) => (
            <tr key={circle.id}>
              <td>{circle.name}</td>
              <td>{circle.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          className="create-btn-new-circle"
          onClick={() => setShowModal(true)}
        >
          New Circle
        </button>

        <p>CIRCLES I OWN / MY CIRCLES</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {myCreatedCircleList.map((circle) => (
              <tr key={circle.id}>
                <td>{circle.name}</td>
                <td>{circle.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Create a new circle</h3>
            <input
              type="text"
              id="circle-name"
              value={circleName}
              placeholder="Circle Name"
              onChange={(e) => setCircleName(e.target.value)}
            />
            <input
              id="circle-description"
              value={circleDescription}
              placeholder="Description"
              onChange={(e) => setCircleDescription(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleCreateCircle}>Create Circle</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyCirclesPage;
