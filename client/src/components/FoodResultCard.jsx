import React, { useState } from "react";

function FoodResultCard({
  searchedFoodInfo,
  didUserFindFood,
  dailyCalories,
  setDailyCalories,
  foodEntries,
  setFoodEntries,
}) {
  const [userServingSize, setUserServingSize] = useState("");

  if (!searchedFoodInfo) {
    return null;
  }
  let caloriesPerGram = 0;
  if (searchedFoodInfo.servingSize && searchedFoodInfo.calories) {
    caloriesPerGram = searchedFoodInfo.calories / searchedFoodInfo.servingSize;
  }

  return (
    <div className="food-result-card">
      {didUserFindFood && <h3>{searchedFoodInfo.name}</h3>}
      {didUserFindFood && <p>Calories: {searchedFoodInfo.calories}</p>}
      <div className="food-result-input-field">
        {didUserFindFood && (
          <input
            type="number"
            value={userServingSize}
            onChange={(e) => setUserServingSize(e.target.value)}
            placeholder="Amount in Grams"
          />
        )}
        {didUserFindFood && (
          <button
            type="button"
            onClick={() => {
              if (!userServingSize) return;
              let caloriesForFood = caloriesPerGram * Number(userServingSize);

              setDailyCalories(dailyCalories + caloriesForFood);
              setFoodEntries((prev) => [
                ...prev,
                {
                  name: searchedFoodInfo.name,
                  calories: caloriesForFood,
                  amount: Number(userServingSize),
                },
              ]);

              setUserServingSize("");
            }}
          >
            Add Food
          </button>
        )}
      </div>
    </div>
  );
}

export default FoodResultCard;
