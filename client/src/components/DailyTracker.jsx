function DailyTracker({ dailyCalories, foodEntries }) {
  const loggedItemsCount = foodEntries.length;

  return (
    <div className="daily-tracker">
      <div className="card-heading">
        <p className="eyebrow">Today</p>
        <h2>Daily Tracker</h2>
      </div>

      <div className="tracker-summary-grid">
        <div className="calorie-total">
          <span>{Math.round(dailyCalories)}</span>
          <p>calories logged</p>
        </div>

        <div className="tracker-stat">
          <span>{loggedItemsCount}</span>
          <p>{loggedItemsCount === 1 ? "food entry" : "food entries"}</p>
        </div>
      </div>

      <div className="food-log">
        <h3>Food Eaten Today</h3>

        {foodEntries.length === 0 ? (
          <p className="empty-state">No foods logged yet.</p>
        ) : (
          foodEntries.map((food, index) => (
            <div className="food-log-item" key={food.id || index}>
              <span>{food.name}</span>
              <strong>
                {Math.round(food.calories)} cal ({Math.round(food.amount)}g)
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DailyTracker;
