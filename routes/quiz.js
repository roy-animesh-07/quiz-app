const express = require("express");
const { startQuiz, submitQuiz, getStandings,getResult,handleUpvote,handleDownvote,handleCreateQuizByAirender,handleCreateQuizByAigenerator,handleComments,handleCreateComments } = require("../controllers/quiz.js");
const {restrictToLoggedinUserOnly,isResultOut} = require("../middlewares/auth.js");
const router = express.Router();

router.get("/start/:id",restrictToLoggedinUserOnly,startQuiz);
router.post("/submit/:id", submitQuiz);
router.get("/standings/id",getStandings);
router.get("/result",isResultOut,getResult);
router.post("/:id/upvote",handleUpvote);
router.post("/:id/downvote",handleDownvote);
router.get("/createQuizByAi",handleCreateQuizByAirender);
router.post("/createQuizByAi",handleCreateQuizByAigenerator);
router.get("/:id/comments",handleComments);
router.post("/:id/comments",handleCreateComments);


module.exports = router;