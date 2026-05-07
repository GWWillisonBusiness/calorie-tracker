import { useState } from "react";

const LoginCard = ({
  setToken,
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
  setFoodEntries,
  setDailyCalories,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");

  const loadFoodEntries = async (authToken) => {
    const response = await fetch("http://localhost:5000/api/foods/entries", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    setFoodEntries(data);

    const totalCalories = data.reduce((sum, food) => {
      return sum + Number(food.calories);
    }, 0);

    setDailyCalories(totalCalories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = authMode === "login" ? "login" : "signup";

    const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Authentication failed");
      return;
    }

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);
    setIsLoggedIn(true);

    await loadFoodEntries(data.token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    setFoodEntries([]);
    setDailyCalories(0);
  };

  return (
    <div className="login-card">
      {!isLoggedIn ? (
        <>
          <div className="card-heading">
            <p className="eyebrow">Account</p>
            <h2>{authMode === "login" ? "Login" : "Sign Up"}</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button type="submit">
              {authMode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <button
            className="link-button"
            type="button"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            {authMode === "login"
              ? "Need an account?"
              : "Already have an account?"}
          </button>
        </>
      ) : (
        <>
          <p className="eyebrow">Signed in</p>
          <h2>{user?.email || "User"}</h2>
          <button
            className="secondary-button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default LoginCard;
