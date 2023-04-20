import React, { useState } from "react";
// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// material ui
import { Paper, InputBase, Divider, IconButton } from "@mui/material/";

export default function SearchForm({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchInput);
    }
  };

  return (
    <div>
      <Paper
        className="search-form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 350,
          height: 50,
        }}
      >
        <InputBase
          type="text"
          className="search-input"
          placeholder="Search "
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ ml: 1, flex: 1 }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          variant="contained"
          color="primary"
          className="search-btn"
          onClick={handleSearch}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </IconButton>
      </Paper>
    </div>
  );
}
