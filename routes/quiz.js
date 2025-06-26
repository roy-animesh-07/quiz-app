const express = require("express");
const { startQuiz, submitQuiz, getStandings,getResult } = require("../controllers/quiz.js");
const {restrictToLoggedinUserOnly,isResultOut} = require("../middlewares/auth.js");
const router = express.Router();

router.get("/start/:id",restrictToLoggedinUserOnly,startQuiz);
router.post("/submit/:id", submitQuiz);
router.get("/standings/id",getStandings);
router.get("/result",isResultOut,getResult);


module.exports = router;