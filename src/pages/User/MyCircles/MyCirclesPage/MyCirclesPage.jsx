import { useEffect } from "react";
import { useSelector,  useDispatch } from "react-redux";

function MyCirclesPage() {
  const {id, username} = useSelector((store) => store.user);
  const myJoinedCircles = useSelector((store) => store.circles.myJoinedCircleList);
  const dispatch = useDispatch();
//   const filteredCircles = joinedCircles ? joinedCircles.filter((circle) =>
//     circle.name.toLowerCase().includes(searchQuery.toLowerCase())
//   ) : [];

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
    }
  };

  // useEffect(() => {
  //   dispatch({
  //       type: "FETCH_MY_JOINED_CIRCLES",
  //     });
  // }, [])

  useEffect(() => {
    dispatch({
        type: "FETCH_MY_JOINED_CIRCLES",
        payload: id
      });
  }, [id]);
  

  return (
    <main className="content-main">
      <h1>My Circles</h1>
      {/* <h2>Welcome, {user.username}!</h2> */}
      {/* <p>Your ID is: {user.id}</p> */}

      <h2>Joined Circles</h2>
      <button className="browse-joinable-btn">Browser Circle</button>
      <input
        type="text"
        className="search-joined-circles"
        placeholder="search by name"
        onKeyDown={handleSearchKeyDown}
      />
      <p>JOINED CIRCLES BELOW</p>
      <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Owner</th>
      </tr>
    </thead>
    <tbody>
      {myJoinedCircles.map((circle) => (
        <tr key={circle.id}>
          <td>{circle.name}</td>
          <td>{circle.description}</td>
          <td>{circle.owner_id}</td>
        </tr>
      ))}
    </tbody>
  </table>

       
      <div>
        <button className="create-new-circle-btn">New Circle</button>

        <p>CIRCLES I OWN / MY CIRCLES</p>
      </div>
    </main>
  );
}

export default MyCirclesPage;
