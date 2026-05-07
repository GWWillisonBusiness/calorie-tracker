const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");

const {
  searchFood,
  addFoodEntry,
  getFoodEntriesByUser,
} = require("../controllers/foodController");

router.get("/search", searchFood);

router.post("/entries", requireAuth, addFoodEntry);
router.get("/entries", requireAuth, getFoodEntriesByUser);

module.exports = router;
