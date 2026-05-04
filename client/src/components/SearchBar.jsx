import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchedFoodInfo, setSearchedFoodInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Search Logic
    try {
      const response = await fetch(
        `http://localhost:5000/api/foods/search?q=${query}`,
      );

      //Set searchedFood Values
      const data = await response.json();
      setSearchedFoodInfo(data);
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
      {searchedFoodInfo && (
        <p>
          {searchedFoodInfo.name.charAt(0).toUpperCase() +
            searchedFoodInfo.name.slice(1).toLowerCase()}
        </p>
      )}
      {searchedFoodInfo && <p>{searchedFoodInfo.calories} Calories</p>}
      {searchedFoodInfo && <p>Serving Size: {searchedFoodInfo.servingSize}{searchedFoodInfo.servingSizeUnits} </p>}
    </form>
  );
};

export default SearchBar;
