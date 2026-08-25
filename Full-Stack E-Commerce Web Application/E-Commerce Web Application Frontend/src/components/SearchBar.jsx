import React, { useState } from "react";

const SearchBar = ({ setSearch, setPage }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    const value = text.trim().toLowerCase();

    if (value !== "") {
      setSearch(value);
      setPage("search");
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;