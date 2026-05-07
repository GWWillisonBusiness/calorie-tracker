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
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Nutrition made simple</p>
          <h1>Calorie Tracker</h1>
          <p className="header-copy">
            Search foods, choose the right serving, and keep your daily total
            organized.
          </p>
        </div>

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
      </header>

      <main className="app-layout">
        <section className="search-panel">
          <div className="section-heading">
            <p className="eyebrow">Food search</p>
            <h2>Find your next entry</h2>
          </div>

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
            setFoodEntries={setFoodEntries}
            token={token}
          />
        </section>

        <section className="tracker-panel">
          <DailyTracker
            dailyCalories={dailyCalories}
            foodEntries={foodEntries}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
