import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ShareManuscriptDialog from "../../../components/Dialogue/ShareManuscriptDialog/ShareManuscriptDialog";
import Header from "../../../layout/Header/Header";
import { Button } from "@mui/material";
import ManuscriptList from "../../../components/ManuscriptList";
import SearchBar from "../../../components/SearchBar";
import useSearch from "../../../hooks/useSearch";
import { searchKeySelector } from "../../../utils/searchUtils";

export default function CircleDashboard() {
  const dispatch = useDispatch();
  const { circle_id, circleName } = useParams();
  const { id: userId } = useSelector((store) => store.user);
  const history = useHistory();
  const { circleManuscriptsList, userManuscriptNotInCircle } = useSelector(
    (store) => store.circles
  );
  const [showShareModal, setShowShareModal] = useState(false);
  useEffect(() => {
    // Dispatch action to saga to get list of manuscripts shared to that specific circle
    dispatch({ type: "FETCH_CIRCLE_MANUSCRIPTS_LIST", payload: circle_id });
  }, [dispatch]);

  const getUserAllManuscriptList = () => {
    const payload = {
      userId,
      circle_id,
    };
    dispatch({
      type: "FETCH_USER_MANUSCRIPTS_NOT_IN_CIRCLE",
      payload,
      callback: (manuscripts) => {
        setShowShareModal(true);
      },
    });
  };

  const handleShareManuscript = (selectedManuscriptsId) => {
    setShowShareModal(false);
    const payload = {
      selectedManuscriptsId,
      circle_id,
    };
    dispatch({
      type: "CREATE_CIRCLE_MANUSCRIPT",
      payload,
    });
  };

  const goToMessageBoard = () => {
    history.push(`/message-board/${circle_id}/${circleName}`);
  };

  const { filteredData, searchTerm, setSearchTerm } = useSearch(circleManuscriptsList, searchKeySelector);

  return (
    <main className="content-main">
      <div align="center">
        <Header
          title={`${
            circleName.charAt(0).toUpperCase() + circleName.slice(1)
          } Dashboard`}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2>SHARED MANUSCRIPTS LIST</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => getUserAllManuscriptList()}
        >
          Share Manuscript
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push(`/circles/${circle_id}/members`)}
        >
          Members
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={goToMessageBoard}
        >
          Message Board
        </Button>

        <ShareManuscriptDialog
          manuscripts={userManuscriptNotInCircle}
          open={showShareModal}
          setOpen={setShowShareModal}
          circleId={circle_id}
          onShare={(selectedManuscriptsId) =>
            handleShareManuscript(selectedManuscriptsId)
          }
        />
        <br></br>
        <br></br>
      </div>
      <ManuscriptList
        manuscripts={filteredData}
        circle_id={circle_id}
      />
    </main>
  );
}
