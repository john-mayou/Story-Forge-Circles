import React, { useState } from "react";

export default function CircleDashboard() {
  const handleSearch = () => {};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="content-main">
      <h1>Circle Dashboard</h1>
      <h2>Circle Manuscripts</h2>
      <div>
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
        <h3>MANUSCRIPTS LIST</h3>
      </div>

      <div>
        <button>Share Manuscript</button>
      </div>

      <div>
        <button>Members</button>
      </div>

      <div>
        <button>Message Board</button>
      </div>
    </main>
  );
}
