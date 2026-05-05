import React, { useState } from "react";

const SearchBar = ({
  searchedFoodInfo,
  setSearchedFoodInfo,
  setDidUserFindFood,
}) => {
  const [query, setQuery] = useState("");
  const [didUserSearch, setDidUserSearch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Search Logic
    setDidUserSearch(true);
    setDidUserFindFood(false);
    try {
      const response = await fetch(
        `http://localhost:5000/api/foods/search?q=${query}`,
      );

      //Set searchedFood Values
      const data = await response.json();
      setSearchedFoodInfo(data);
      setDidUserFindFood(true);
      setDidUserSearch(false);
    } catch (error) {
      console.error("Error attempting to fetch:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for foods..."
        />
        <button type="submit">Search</button>
      </form>
      {didUserSearch && !searchedFoodInfo && <p>Food Not Found</p>}
    </div>
  );
};

export default SearchBar;
