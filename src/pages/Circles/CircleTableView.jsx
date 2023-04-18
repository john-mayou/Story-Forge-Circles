import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import './TableStyling.css'

export default function CircleTableView({ circlelist, isJoined = false }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { owned_circles, joined_circles, id } = useSelector(
    (store) => store.user
  );

  const navigateToCircleDashboard = ({ id, name }) => {
    if (owned_circles.includes(id) || joined_circles.includes(id)) {
      history.push(`/circle-dashboard/${id}/${name}`);
    } else {
      alert("You must be a subscriber to view this circle.");
    }
  };

  return (
    <table className='circle-Table'>
      <thead>
        <tr className='table-header'>
          <th><h3>Name</h3></th>
          <th><h3>Description</h3></th>
          <th><h3>Join</h3></th>
          <th><h3>Go</h3></th>
        </tr>
      </thead>
      <tbody>
        {circlelist?.map((circle, index) => {
          return (
            <tr className='circle-table-row-style' key={circle.id}>
              <td><p>{circle.name}</p></td>
              <td><p>{circle.description}</p></td>
              <td>
                {!owned_circles.includes(circle.id) &&
                !joined_circles.includes(circle.id) ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      dispatch({
                        type: "CREATE_NEW_NOTIFICATION",
                        payload: {
                          circle_id: circle.id,
                          recipient_id: circle.owner_id,
                          type: "request to join - leader action",
                        },
                      })
                    }
                  >
                    Request to Join
                  </Button>
                ) : (
                  <span>Joined</span>
                )}
              </td>
              <td onClick={() => navigateToCircleDashboard(circle)}>
                <Button variant="contained" color="primary">
                  Go
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
