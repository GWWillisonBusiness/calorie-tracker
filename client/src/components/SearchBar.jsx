import { useState } from "react";

const SearchBar = ({
  setFoodOptions,
  setSelectedFood,
  setDidUserFindFood,
  didUserFindFood,
}) => {
  const [query, setQuery] = useState("");
  const [didUserSearch, setDidUserSearch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidUserSearch(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/foods/search?q=${query}`,
      );

      const data = await response.json();

      setFoodOptions(data);
      setSelectedFood(null);
      setDidUserFindFood(data.length > 0);
    } catch (error) {
      console.error("Error attempting to fetch:", error);
    }
  };

  return (
    <div className="search-card">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for foods..."
        />
        <button type="submit">Search</button>
      </form>

      {!didUserFindFood && didUserSearch && (
        <p className="empty-state">Food not found. Try a simpler search.</p>
      )}
    </div>
  );
};

export default SearchBar;
