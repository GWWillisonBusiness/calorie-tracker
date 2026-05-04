import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Search Logic
    try {
      const response = await fetch(
        `http://localhost:5000/api/foods/search?q=${query}`,
      );

      const data = response.json(); //stores the json data we made from cleanedData in the backend
    } catch (error) {
      console.error("Error attempting to fetch:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for foods..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
