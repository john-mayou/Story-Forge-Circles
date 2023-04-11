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
    history.push(`/search-joined-cirlces?term=${searchTerm}`);
  };

  //the "Enter" key (keyCode 13)
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
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
        <button className="create-btn-new-circle">New Circle</button>

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
    </main>
  );
}

export default MyCirclesPage;
