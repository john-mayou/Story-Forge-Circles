import React, { useState } from "react";

export default function CircleDashboard() {
  
  const handleSearch = () => {
   
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
     handleSearch();
    }
  };

  return (
    <main className="content-main">
      <h1>CircleDashboard</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search manuscript"
        onChange={(e) => e.target.value}
        onKeyPress={handleKeyPress}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </main>
  );
}
