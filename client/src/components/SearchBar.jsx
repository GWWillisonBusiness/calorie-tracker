import React, { useState } from "react";

const SearchBar = ({
  searchedFoodInfo,
  setSearchedFoodInfo,
  setDidUserFindFood,
  didUserFindFood,
}) => {
  const [query, setQuery] = useState("");
  const [didUserSearch, setDidUserSearch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Search Logic
    setDidUserSearch(true); //user attemps to look for food
    try {
      const response = await fetch(
        `http://localhost:5000/api/foods/search?q=${query}`,
      );

      //Set searchedFood Values
      const data = await response.json();
      setDidUserFindFood(data.name); //if the data has a name set it to true

      setSearchedFoodInfo(data); //set data to foodInfo, even if no food is returned
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
      {!didUserFindFood && didUserSearch && <p>Food Not Found</p>}
    </div>
  );
};

export default SearchBar;
