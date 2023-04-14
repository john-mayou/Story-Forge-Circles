import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ShareManuscriptModal from "../ShareManuscriptModal";
import SearchCircleForm from "../SearchCircleForm";
import { useHistory } from "react-router-dom";
import CircleTableManuscriptView from "../CircleTableManuscriptView";

export default function CircleDashboard() {
  const dispatch = useDispatch();
  const { circle_id } = useParams();
  const { id } = useSelector((store) => store.user);
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
    dispatch({
      type: "FETCH_USER_MANUSCRIPTS_NOT_IN_CIRCLE",
      payload: id,
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

  const handleSearch = (searchTerm) => {
    history.push(`/search-circles/circleManuscriptsList?term=${searchTerm}`);
  };

  const goToMessageBoard = () => {
    history.push(`/message-board/${circle_id}`)
  }

  return (
    <main className="content-main">
      <h1>Circle Dashboard</h1>
      <h2>Circle Manuscripts</h2>
      <SearchCircleForm onSearch={handleSearch} />
      <h3>SHARED MANUSCRIPTS LIST</h3>
      <CircleTableManuscriptView manuscriptlist={circleManuscriptsList} />

      <button onClick={() => getUserAllManuscriptList()}>
        Share Manuscript
      </button>

      <button>Members</button>

      <button onClick={goToMessageBoard}>Message Board</button>

      {showShareModal && (
        <ShareManuscriptModal
          manuscripts={userManuscriptNotInCircle}
          circleId={circle_id}
          closeModal={() => setShowShareModal(false)}
          onShare={(selectedManuscriptsId) =>
            handleShareManuscript(selectedManuscriptsId)
          }
        />
      )}
    </main>
  );
}
