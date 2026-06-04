const express = require("express");
const router = express.Router();
const { askGemini } = require("../controllers/AiController");
const { auth, isStudent } = require("../middlewares/auth"); 

// Route is protected: User must be logged in AND be a student
router.post("/chat", auth, isStudent, askGemini);

module.exports = router;