import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodResultCard from "./components/FoodResultCard";
import DailyTracker from "./components/DailyTracker";
import LoginCard from "./components/LoginCard";
import FoodOptionsList from "./components/FoodOptionsList";

function App() {
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [didUserFindFood, setDidUserFindFood] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [foodEntries, setFoodEntries] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  return (
    <div>
      <h1>Calorie Tracker</h1>

      <LoginCard
        token={token}
        setToken={setToken}
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setFoodEntries={setFoodEntries}
        setDailyCalories={setDailyCalories}
      />

      <DailyTracker dailyCalories={dailyCalories} foodEntries={foodEntries} />

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
        token={token}
      />
    </div>
  );
}

export default App;
