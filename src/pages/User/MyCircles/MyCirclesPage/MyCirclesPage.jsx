import { useEffect, useState } from "react";
import { useSelector,  useDispatch } from "react-redux";

function MyCirclesPage() {
  const {id, username} = useSelector((store) => store.user);
  const {myJoinedCircleList, myCreatedCircleList} = useSelector((store) => store.circles);

  const dispatch = useDispatch();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJoinedCircles, setFilteredJoinedCircles] = useState([]);


  
  const handleSearch = () => {
    const filteredCircles = myJoinedCircleList.filter((circle) =>
      circle.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJoinedCircles(filteredCircles);
  };



  useEffect(() => {
    dispatch({
        type: "FETCH_MY_JOINED_CIRCLES",
        payload: id
      });

      dispatch({
        type: "FETCH_MY_CREATED_CIRCLES",
        payload: id
      });
  }, [id, dispatch]);
  
  useEffect(() => {
    const filteredCircles = myJoinedCircleList.filter((circle) =>
      circle.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJoinedCircles(filteredCircles);
  }, [myJoinedCircleList, searchQuery]);

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
        placeholder="Search by name"
        onChange={(event) => setSearchQuery(event.target.value)}
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
      {filteredJoinedCircles.map((circle) => (
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
        <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Owner</th>
      </tr>
    </thead>
    <tbody>
      {myCreatedCircleList.map((circle) => (
        <tr key={circle.id}>
          <td>{circle.name}</td>
          <td>{circle.description}</td>
          <td>{circle.owner_id}</td>
        </tr>
      ))}
    </tbody>
  </table>

        
      </div>
    </main>
  );
}

export default MyCirclesPage;
