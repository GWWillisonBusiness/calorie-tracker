const axios = require("axios");
const pool = require("../config/db");

const searchFood = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    const response = await axios.get(
      "https://api.nal.usda.gov/fdc/v1/foods/search",
      {
        params: {
          query: searchTerm,
          api_key: process.env.USDA_API_KEY,
        },
      },
    );

    const foods = response.data.foods;

    if (!foods || foods.length === 0) {
      return res.json([]);
    }

    const cleanedData = foods.slice(0, 10).map((food) => {
      let calories = null;

      for (let i = 0; i < food.foodNutrients.length; i++) {
        if (food.foodNutrients[i].nutrientName === "Energy") {
          calories = food.foodNutrients[i].value;
        }
      }

      return {
        fdcId: food.fdcId,
        name: food.description,
        calories: calories,
        servingSize: food.servingSize || 100,
        servingSizeUnits: food.servingSizeUnit || "g",
        commonServingSizeUnits: food.householdServingFullText,
      };
    });

    res.json(cleanedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch food data" });
  }
};

const addFoodEntry = async (req, res) => {
  try {
    const { accountNumber, name, calories, amount } = req.body;

    await pool.query(
      `
      INSERT INTO food_entries
      (account_number, food_name, calories, amount)
      VALUES ($1, $2, $3, $4)
      `,
      [accountNumber, name, calories, amount],
    );

    res.status(201).json({ message: "Food entry saved successfully" });
  } catch (error) {
    console.error("Error adding food entry:", error);
    res.status(500).json({ message: "Failed to save food entry" });
  }
};

const getFoodEntriesByAccount = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const result = await pool.query(
      `
      SELECT
      id,
      account_number AS "accountNumber",
      food_name AS name,
      calories,
      amount,
      created_at AS "createdAt"
      FROM food_entries
      WHERE account_number = $1
      ORDER BY created_at DESC
      `,
      [accountNumber],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting food entries:", error);
    res.status(500).json({ message: "Failed to get food entries" });
  }
};

module.exports = {
  searchFood,
  addFoodEntry,
  getFoodEntriesByAccount,
};
