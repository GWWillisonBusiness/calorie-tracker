import React from "react";

const LoginCard = ({
  accountNumber,
  setAccountNumber,
  isLoggedIn,
  setIsLoggedIn,
  setFoodEntries,
  setDailyCalories,
}) => {
  const  handleLogin = async (e) => {
    e.preventDefault();

    setIsLoggedIn(true);

    //Grab users food that they've already added
    const response = await fetch(
    `http://localhost:5000/api/foods/entries/${accountNumber}`
    );

    const data = await response.json();

    setFoodEntries(data);

    const totalCalories = data.reduce((sum, food) => {
      return sum + Number(food.calories);
    }, 0);

    setDailyCalories(totalCalories);
  };

  return (
    <>
      {!isLoggedIn && (
        <div className="login-card">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <label>
              Account Number
              <input
                type="number"
                name="accountNumber"
                min="0"
                step="1"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </label>

            <button type="submit">Sign In</button>
          </form>
        </div>
      )}

      {isLoggedIn && (
        <div className="login-card">
          <h2>Logged in As: {accountNumber}</h2>
        </div>
      )}
    </>
  );
};

export default LoginCard;
