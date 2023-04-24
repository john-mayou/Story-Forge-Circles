import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Portal from "@mui/material/Portal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/global/TableStyling.css";
import "../../../assets/styles/global/SnackBarStyling.css";

export default function CircleTable({ circleList, type, searchBar }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // Local State
  const [filter, setFilter] = useState("");
  const [filteredCircles, setFilteredCircles] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    setFilteredCircles(circleList);
  }, [circleList]);

  return (
    <>
      {searchBar && (
        <Paper
          className="search-component"
          sx={{
            p: "2px 4px",
            my: 1,
            display: "flex",
            alignItems: "center",
            width: 350,
            height: 50,
          }}
        >
          <InputBase
            className="search-input"
            type="text"
            placeholder="Search..."
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
            sx={{ ml: 1, flex: 1 }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            variant="contained"
            color="primary"
            className="search-btn"
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconButton>
        </Paper>
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
                      onClick={() => {
                        dispatch({
                          type: "CREATE_NEW_NOTIFICATION",
                          payload: {
                            circle_id: circle.id,
                            recipient_id: circle.owner_id,
                            type: "request to join - leader action",
                          },
                        });
                        setSuccessOpen(true);
                      }}
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
      <Portal>
        <Snackbar
          message="Successfully sent request to circle leader"
          autoHideDuration={6000}
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
        />
      </Portal>
    </>
  );
}
