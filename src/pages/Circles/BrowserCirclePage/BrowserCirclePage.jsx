import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MyCirclesPage() {
  const { allPublicCirclesList } = useSelector(
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
      type: "FETCH_ALL_PUBLIC_CIRCLES",

    });
  }, [dispatch]);

  const handleSearch = () => {
    history.push(`/search-joined-cirlces?term=${searchTerm}`);
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
        className="search-joined-circles"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn-joined-circle" onClick={handleSearch}>
        search!
      </button>
      <p>JOINABLE CIRCLES BELOW</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allPublicCirclesList.map((circle) => (
            <tr key={circle.id}>
              <td>{circle.name}</td>
              <td>{circle.description}</td>
            </tr>
          ))}
        </tbody>
      </table>


        </main>
  );
}

export default MyCirclesPage;
