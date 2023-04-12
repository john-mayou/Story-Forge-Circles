import React from "react";

export default function CircleTableView({ circlelist, isJoined = false }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {circlelist.map((circle) => (
          <tr key={circle.id}>
            <td>
              {circle.name}
              {isJoined && <button>JOIN</button>}
            </td>

            <td>{circle.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
