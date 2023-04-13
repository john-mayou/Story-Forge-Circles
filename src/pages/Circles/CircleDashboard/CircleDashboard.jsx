import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ShareManuscriptModal from "../ShareManuscriptModal/ShareManuscriptModal";

export default function CircleDashboard() {
  const dispatch = useDispatch();
  const { circle_id } = useParams();
  const { id } = useSelector((store) => store.user);

  const { circleManuscriptsList, userManuscriptNotInCircle } = useSelector(
    (store) => store.circles
  );

  // user's list of shareable manuscripts
  const [shareManuscripts, setshareManuscripts] = useState([]);

  const [showShareModal, setShowShareModal] = useState(false);

  const handleSearch = () => {
    console.log("here search in circledashboard");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Dispatch action to saga to get list of manuscripts shared to that specific circle
    dispatch({ type: "FETCH_CIRCLE_MANUSCRIPTS_LIST", payload: circle_id });
  }, [dispatch]);

  const getUserAllManuscriptList = () => {
    dispatch({
      type: "FETCH_USER_MANUSCRIPTS_NOT_IN_CIRCLE",
      payload: id,
      callback: (manuscripts) => {
        setshareManuscripts(manuscripts);
        setShowShareModal(true);
      },
    });
  };

  const handleShareManuscript = (selectedManuscriptsId) => {
    console.log("selectedManuscriptsId", selectedManuscriptsId);
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

  return (
    <main className="content-main">
      <h1>Circle Dashboard</h1>
      <h2>Circle Manuscripts</h2>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Search manuscript"
          onChange={(e) => e.target.value}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        <h3>SHARED MANUSCRIPTS LIST</h3>

        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {circleManuscriptsList.map((manuscript) => (
              <tr key={manuscript?.id}>
                <td>{manuscript?.author}</td>
                <td>{manuscript?.title}</td>
                <td>{manuscript?.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <button onClick={() => getUserAllManuscriptList()}>
          Share Manuscript
        </button>
      </div>

      <div>
        <button>Members</button>
      </div>

      <div>
        <button>Message Board</button>
      </div>

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
