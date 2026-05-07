function FoodOptionsList({ foodOptions, setSelectedFood, setFoodOptions }) {
  if (foodOptions.length === 0) {
    return null;
  }

  return (
    <div className="food-options-list">
      <h3>Choose a Food</h3>

      {foodOptions.map((food) => (
        <div key={food.fdcId} className="food-option-card">
          <div>
            <h4>{food.name}</h4>

            <p>
              {food.calories} calories per {food.servingSize}
              {food.servingSizeUnits}
            </p>

            {food.commonServingSizeUnits && (
              <p>Common serving: {food.commonServingSizeUnits}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedFood(food);
              setFoodOptions([]);
            }}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
}

export default FoodOptionsList;
