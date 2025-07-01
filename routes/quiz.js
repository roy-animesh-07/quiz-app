const express = require("express");
const { startQuiz, submitQuiz, getStandings,getResult,handleUpvote,handleDownvote,handleCreateQuizByAirender,handleCreateQuizByAigenerator,handleComments,handleCreateComments } = require("../controllers/quiz.js");
const {onlyToLogedInUsers,isResultOut} = require("../middlewares/auth.js");
const router = express.Router();

router.get("/start/:id",onlyToLogedInUsers,startQuiz);
router.post("/submit/:id",onlyToLogedInUsers, submitQuiz);
router.get("/standings/id",getStandings);
router.get("/result",isResultOut,getResult);
router.post("/:id/upvote",onlyToLogedInUsers,handleUpvote);
router.post("/:id/downvote",onlyToLogedInUsers,handleDownvote);
router.get("/createQuizByAi",onlyToLogedInUsers,handleCreateQuizByAirender);
router.post("/createQuizByAi",onlyToLogedInUsers,handleCreateQuizByAigenerator);
router.get("/:id/comments",handleComments);
router.post("/:id/comments",onlyToLogedInUsers,handleCreateComments);


module.exports = router;