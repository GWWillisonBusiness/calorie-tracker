const express = require("express");
const router = express.Router();

const { searchFood, addFoodEntry, getFoodEntriesByAccount } = require("../controllers/foodController");

router.get("/search", searchFood);
router.post("/entries", addFoodEntry);
router.get("/entries/:accountNumber", getFoodEntriesByAccount);

module.exports = router;
