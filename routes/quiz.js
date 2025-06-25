const express = require("express");
const { startQuiz, submitQuiz, getStandings } = require("../controllers/quiz.js");
const {restrictToLoggedinUserOnly} = require("../middlewares/auth.js");
const router = express.Router();

router.get("/start/:id",restrictToLoggedinUserOnly,startQuiz);
router.post("/submit/:id", submitQuiz);
router.get("/standings/id",getStandings);

module.exports = router;