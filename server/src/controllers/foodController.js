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

    res.json(response.data.foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch food data" });
  }
};

module.exports = {
  searchFood,
};
