import { useState } from "react";

function FoodResultCard({
  searchedFoodInfo,
  didUserFindFood,
  dailyCalories,
  setDailyCalories,
  setFoodEntries,
  token,
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

    const caloriesForFood = Math.floor(
      caloriesPerGram * Number(userServingSize),
    );

    const newFoodEntry = {
      name: searchedFoodInfo.name,
      calories: caloriesForFood,
      amount: Number(userServingSize),
    };

    try {
      const response = await fetch("http://localhost:5000/api/foods/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFoodEntry),
      });

      if (!response.ok) {
        alert("You must be logged in to save food");
        return;
      }

      setDailyCalories(dailyCalories + caloriesForFood);
      setFoodEntries((prev) => [...prev, newFoodEntry]);
      setUserServingSize("");
    } catch (error) {
      console.error("Error saving food entry:", error);
    }
  };

  return (
    <div className="food-result-card">
      {didUserFindFood && (
        <div className="card-heading">
          <p className="eyebrow">Selected food</p>
          <h3>{searchedFoodInfo.name}</h3>
          <p>{searchedFoodInfo.calories} calories per serving</p>
        </div>
      )}

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
