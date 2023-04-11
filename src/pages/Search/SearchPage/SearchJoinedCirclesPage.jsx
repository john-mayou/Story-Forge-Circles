import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function SearchJoinedCirclesPage() {
  const { myJoinedCircleList } = useSelector((store) => store.circles);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("term");

  const filteredCircles = myJoinedCircleList.filter((circle) =>
    circle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="content-main">
      <h1>SearchJoinedCirclesPage</h1>
      <h2>Results for "{searchTerm}"</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredCircles.map((circle) => (
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
