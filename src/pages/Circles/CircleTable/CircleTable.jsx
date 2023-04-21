import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../../../assets/styles/global/TableStyling.css";

export default function CircleTable({ circleList, type, searchBar }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // Local State
  const [filter, setFilter] = useState("");
  const [filteredCircles, setFilteredCircles] = useState([]);

  useEffect(() => {
    setFilteredCircles(circleList);
  }, [circleList]);

  return (
    <>
      {searchBar && (
        <input
          className="circle-filter-input"
          placeholder="Search"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setFilteredCircles(
              circleList.filter(({ name, description }) => {
                const regex = new RegExp(`${e.target.value}`, "i");
                return regex.test(name) || regex.test(description);
              })
            );
          }}
        />
      )}
      <table className="circle-Table">
        <thead>
          <tr className="table-header">
            <th>
              <h3>Name</h3>
            </th>
            <th>
              <h3>Description</h3>
            </th>
            {type === "public" ? (
              <th>
                <h3>Join</h3>
              </th>
            ) : (
              <th>
                <h3>Dashboard</h3>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredCircles?.map((circle) => {
            return (
              <tr className="circle-table-row-style" key={circle.id}>
                <td>
                  <p>{circle.name}</p>
                </td>
                <td>
                  <p>{circle.description}</p>
                </td>

                {type === "public" ? (
                  <td>
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
                  </td>
                ) : (
                  ""
                )}

                {type !== "public" && (
                  <td
                    onClick={() =>
                      history.push(
                        `/circle-dashboard/${circle.id}/${circle.name}`
                      )
                    }
                  >
                    <Button variant="contained" color="primary">
                      Go
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
