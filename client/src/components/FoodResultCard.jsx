import React, { useState } from "react";

function FoodResultCard({
  searchedFoodInfo,
  didUserFindFood,
  dailyCalories,
  setDailyCalories,
  foodEntries,
  setFoodEntries,
  accountNumber,
}) {
  const [userServingSize, setUserServingSize] = useState("");

  if (!searchedFoodInfo) {
    return null;
  }

  let caloriesPerGram = 0;

  if (searchedFoodInfo.servingSize && searchedFoodInfo.calories) {
    caloriesPerGram = searchedFoodInfo.calories / searchedFoodInfo.servingSize;
  }

  const handleAddFood = async () => {
    if (!userServingSize) return;

    const caloriesForFood = Math.floor(caloriesPerGram * Number(userServingSize));

    const newFoodEntry = {
      accountNumber: accountNumber,
      name: searchedFoodInfo.name,
      calories: caloriesForFood,
      amount: Number(userServingSize),
    };

    setDailyCalories(dailyCalories + caloriesForFood);

    setFoodEntries((prev) => [...prev, newFoodEntry]);

    try {
      await fetch("http://localhost:5000/api/foods/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFoodEntry),
      });
    } catch (error) {
      console.error("Error saving food entry:", error);
    }

    setUserServingSize("");
  };

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
          <button type="button" onClick={handleAddFood}>
            Add Food
          </button>
        )}
      </div>
    </div>
  );
}

export default FoodResultCard;
