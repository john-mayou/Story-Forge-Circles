import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchForm from "../../Search/SearchForm";
import CreateCircleDialog from "../../../components/Dialogue/CreateDialog/CreateCircleDialog";
import { Button } from "@mui/material";

function MyCirclesPage() {
  const { id } = useSelector((store) => store.user);
  const { myJoinedCircleList, myCreatedCircleList } = useSelector(
    (store) => store.circles
  );

  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSearch = (searchTerm) => {
    history.push(`/search/circles/myJoinedCircleList?term=${searchTerm}`);
  };

  const handleCreateCircle = () => {
    // Check if the inputs are not empty
    if (!circleName || !circleDescription) {
      alert("Please enter a value for both Circle Name and Description");
      return;
    }

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
      <div align="center">
        <h1>My Circles</h1>

        <h2>Joined Circles</h2>
        <Button
          variant="contained"
          color="secondary"
          className="browse-joinable-btn"
          onClick={() => history.push(`/circles-browser`)}
        >
          Circle Browser
        </Button>
        <br />
        <br />

        <SearchForm onSearch={handleSearch} />
        <h2>JOINED CIRCLES BELOW</h2>
      </div>

      <CircleTableView circlelist={myJoinedCircleList} />

      <div align="center">
        <h2>CIRCLES I OWN / MY CIRCLES</h2>

        <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        + New Circle
      </Button>

      <CreateCircleDialog
        title="Create Circle"
        open={showModal}
        setOpen={setShowModal}
        inputOne={circleName}
        setInputOne={setCircleName}
        inputTwo={circleDescription}
        setInputTwo={setCircleDescription}
        onConfirm={() => handleCreateCircle()}
      />
      <br></br>
      <br></br>
      </div>

      <CircleTableView circlelist={myCreatedCircleList} />
  
      
    </main>
  );
}

export default MyCirclesPage;
