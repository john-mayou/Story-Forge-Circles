import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchMessageBoard(props) {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Functional Component");

  return (
    <>
      <Paper
        className="search-form"
        sx={{
          p: "2px 4px",
          mt: 1,
          display: "flex",
          alignItems: "center",
          width: 300,
          height: 50,
        }}
      >
        <InputBase
          type="search"
          className="message-board-search"
          id="message-board-search"
          name="message-board-input"
          placeholder="Search..."
          sx={{
            p: "10px 10px",
            display: "flex",
            alignItems: "center",
          }}
        />
        <br></br>
        <Divider
          sx={{ height: 28, m: 0.5, ml: "auto" }}
          orientation="vertical"
        />
        <IconButton
          variant="contained"
          color="primary"
          className="search-btn"
          type="button"
          sx={{ p: "10px" }}
          aria-label="search button"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconButton>
      </Paper>
    </>
  );
}
export default SearchMessageBoard;
