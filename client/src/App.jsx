import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodResultCard from "./components/FoodResultCard";

function App() {
  const [searchedFoodInfo, setSearchedFoodInfo] = useState(null);
  const [didUserFindFood, setDidUserFindFood] = useState(false);

  return (
    <div>
      <h1>Hello World! Frontend</h1>
      <h2>Search Bar</h2>
      <SearchBar setSearchedFoodInfo={searchedFoodInfo, setSearchedFoodInfo} setDidUserFindFood={setDidUserFindFood}/>
      <FoodResultCard searchedFoodInfo={searchedFoodInfo}
      didUserFindFood={didUserFindFood} />
    </div>
  );
}

export default App;
