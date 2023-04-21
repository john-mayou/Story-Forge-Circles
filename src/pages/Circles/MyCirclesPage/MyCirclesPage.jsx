import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTable from "../CircleTable/CircleTable";
import CreateCircleDialog from "../../../components/Dialogue/CreateDialog/CreateCircleDialog";
import { Button } from "@mui/material";
import Header from "../../../layout/Header/Header";

function MyCirclesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, owned_circles, joined_circles } = useSelector(
    (store) => store.user
  );

  // Local State
  const [showModal, setShowModal] = useState(false);
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");

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
      <Header title={"My Circles"} />
      <div align="center">
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

        <h2>JOINED CIRCLES</h2>
      </div>

      <CircleTable circleList={joined_circles} type="joined" />

      <div align="center">
        <h2>MY OWNED CIRCLES</h2>

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
          onConfirm={handleCreateCircle}
        />
        <br></br>
        <br></br>
      </div>

      <CircleTable circleList={owned_circles} type="owned" />
    </main>
  );
}

export default MyCirclesPage;
