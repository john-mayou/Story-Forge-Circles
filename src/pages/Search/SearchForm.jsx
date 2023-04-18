import React, { useState } from "react";
import { Button } from "@mui/material";

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
      <input
        type="text"
        className="search-input"
        placeholder="Search "
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button variant="contained" color="primary" className="search-btn" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}