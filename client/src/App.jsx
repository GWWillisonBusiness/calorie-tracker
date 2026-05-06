import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodResultCard from "./components/FoodResultCard";
import DailyTracker from "./components/DailyTracker";
import LoginCard from "./components/LoginCard";
import FoodOptionsList from "./components/FoodOptionsList";

function App() {
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchedFoodInfo, setSearchedFoodInfo] = useState(null);
  const [didUserFindFood, setDidUserFindFood] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodEntries, setFoodEntries] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>Calorie Tracker</h1>
      <LoginCard
        accountNumber={accountNumber}
        setAccountNumber={setAccountNumber}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setFoodEntries={setFoodEntries}
        setDailyCalories={setDailyCalories}
      />
      <DailyTracker
        dailyCalories={dailyCalories}
        setDailyCalories={setDailyCalories}
        totalCalories={totalCalories}
        setTotalCalories={setTotalCalories}
        foodEntries={foodEntries}
      />
      <h2>Search Bar</h2>
      <SearchBar
        setFoodOptions={setFoodOptions}
        setSelectedFood={setSelectedFood}
        setDidUserFindFood={setDidUserFindFood}
        didUserFindFood={didUserFindFood}
      />
      <FoodOptionsList
        foodOptions={foodOptions}
        setSelectedFood={setSelectedFood}
        setFoodOptions={setFoodOptions}
      />
      <FoodResultCard
        searchedFoodInfo={selectedFood}
        didUserFindFood={didUserFindFood}
        dailyCalories={dailyCalories}
        setDailyCalories={setDailyCalories}
        foodEntries={foodEntries}
        setFoodEntries={setFoodEntries}
        accountNumber={accountNumber}
      />
    </div>
  );
}

export default App;
