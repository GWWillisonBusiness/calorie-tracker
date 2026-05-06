import React from "react";

const LoginCard = ({
  accountNumber,
  setAccountNumber,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn && (
        <div className="login-card">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
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
