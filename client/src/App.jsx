import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodResultCard from "./components/FoodResultCard";
import DailyTracker from "./components/DailyTracker";

function App() {
  const [searchedFoodInfo, setSearchedFoodInfo] = useState(null);
  const [didUserFindFood, setDidUserFindFood] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodEntries, setFoodEntries] = useState([]);

  return (
    <div>
      <h1>Hello World! Frontend</h1>
      <DailyTracker
        dailyCalories={dailyCalories}
        setDailyCalories={setDailyCalories}
        totalCalories={totalCalories}
        setTotalCalories={setTotalCalories}
        foodEntries={foodEntries}
      />
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
        dailyCalories={dailyCalories}
        setDailyCalories={setDailyCalories}
        foodEntries={foodEntries}
        setFoodEntries={setFoodEntries}
      />
    </div>
  );
}

export default App;
