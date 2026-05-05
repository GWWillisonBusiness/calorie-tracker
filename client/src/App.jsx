import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodResultCard from "./components/FoodResultCard";

function App() {
  const [searchedFoodInfo, setSearchedFoodInfo] = useState(null);
  const [didUserFindFood, setDidUserFindFood] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  return (
    <div>
      <h1>Hello World! Frontend</h1>
      <h2>Search Bar</h2>
      <SearchBar
        searchedFoodInfo={searchedFoodInfo}
        setSearchedFoodInfo={setSearchedFoodInfo}
        didUserFindFood={didUserFindFood}
        setDidUserFindFood={setDidUserFindFood}
      />
      <FoodResultCard
        searchedFoodInfo={searchedFoodInfo}
        didUserFindFood={didUserFindFood}
      />
    </div>
  );
}

export default App;
