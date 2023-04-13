import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CircleDashboard() {

    const dispatch = useDispatch();


    const [sharedManuscripts, setSharedManuscripts] = useState([]);
  const handleSearch = () => {
    console.log('here search in circledashboard')
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Dispatch action to saga to get list of manuscripts shared to that specific circle
    dispatch({ type: "FETCH_SHARED_MANUSCRIPTS", payload: { circleId: 1} });
  }, [dispatch]);


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
        <ul>
          {sharedManuscripts.map((manuscript) => (
            <li key={manuscript.id}>{manuscript.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <button>Share Manuscript</button>
      </div>

      <div>
        <button>Members</button>
      </div>

      <div>
        <button>Message Board</button>
      </div>
    </main>
  );
}
