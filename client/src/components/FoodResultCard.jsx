import React from "react";

function FoodResultCard({ searchedFoodInfo, didUserFindFood }) {
  if (!searchedFoodInfo) {
    return null;
  }

  return (
    <div className="food-result-card">
      {didUserFindFood && <h3>{searchedFoodInfo.name}</h3>}
      {didUserFindFood && <p>Calories: {searchedFoodInfo.calories}</p>}
      {didUserFindFood && (
        <button
          type="button"
          onClick={() => onSelect && onSelect(searchedFoodInfo)}
        >
          Add Food
        </button>
      )}
    </div>
  );
}

export default FoodResultCard;
