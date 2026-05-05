const axios = require("axios");

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

    // Check that food actually exist in database
    if (response.data === null) {
      console.log("Error: Food Doesn't Exist");
      return;
    }

    // Returns Array of Name, Calories, Serving Size, and the Unit for the Serving Size
    const cleanedData = {
      name: response.data.foods[0].description,
      calories: null,
      servingSize: response.data.foods[0].servingSize,
      servingSizeUnits: response.data.foods[0].servingSizeUnit,
      commonServingSizeUnits: response.data.foods[0].householdServingFullText,
    };

    //res.json(response.data.foods[0]);

    //Finds where the calorie value is located
    for (let i = 0; i < response.data.foods[0].foodNutrients.length; i++) {
      if (response.data.foods[0].foodNutrients[i].nutrientName === "Energy") {
        cleanedData.calories = response.data.foods[0].foodNutrients[i].value;
      }
    }
    res.json(cleanedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch food data" });
  }
};

module.exports = {
  searchFood,
};
