const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/auth.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);

module.exports = router;
