import React, { useState } from "react";

function DailyTracker({
  setDailyCalories,
  dailyCalories,
  setTotalCalories,
  totalCalories,
  foodEntries,
}) {
  return (
    <div className="daily-tracker">
      <h2>Daily Tracker</h2>
      <h4>Daily Calories: {Math.round(dailyCalories)}</h4>
      <div>
        <h5>Food Eaten Today:</h5>
        {foodEntries.map((food, index) => (
          <div key={index}>
            {food.name} — {Math.round(food.calories)} cal (
            {Math.round(food.amount)}g)
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyTracker;
