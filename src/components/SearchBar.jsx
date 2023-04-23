import React from "react";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// material ui
import { Paper, InputBase, Divider, IconButton } from "@mui/material/";

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
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
        <InputBase className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
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
    </div>
  );
};

export default SearchBar;