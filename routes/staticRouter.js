const express = require("express");
const router = express.Router();
const quizes = require("../models/quiz");
const User = require("../models/user");
const quizResponse = require("../models/quizresponse");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

const liveQuizes = async () => {
  try {
    const quizesList = await quizes.find({
      startTime: { $lte: new Date() },
      endTime: { $gte: new Date() },
    }).populate("createdBy", "name email").sort({ startTime: 1 }).limit(5);
    return quizesList;
  } catch (error) {
    console.error("Error fetching live quizzes:", error);
    return [];
  }
}
const upcomingQuizes = async () => {
  try {
    const quizesList = await quizes.find({
      startTime: { $gt: new Date() },
    }).populate("createdBy", "name email").sort({ startTime: 1 }).limit(5);
    
    return quizesList;
  } catch (error) {
    console.error("Error fetching upcoming quizzes:", error);
    return [];
  }
}
const pastQuizes = async () => {
  try {
    const quizesList = await quizes.find({
      endTime: { $lt: new Date() },
    }).populate("createdBy", "name email").sort({ endTime: -1 }).limit(5);
    
    return quizesList;
  } catch (error) {
    console.error("Error fetching past quizzes:", error);
    return [];
  }
}
const userQuizes = async (userId) => {
  try {
    const quizesList = await quizResponse.find({
      user: userId,
    });
    let myAttemptedQuizes = quizesList.map((quiz) => quiz.quiz);
    if (myAttemptedQuizes.length === 0) {
      return [];
    }
    const quizesDetails = await quizes.find({
      _id: { $in: myAttemptedQuizes },
    }).populate("createdBy", "name email").sort({ startTime: -1 }); 
    return quizesDetails;
  } catch (error) {
    console.error("Error fetching user's quizzes:", error);
    return [];
  }
}


router.get("/", async (req, res) => {
  return res.render("home",{
    user:req.user,
    upcomingQuizes: await upcomingQuizes(),
    pastQuizes: await pastQuizes(),
    liveQuizes: await liveQuizes(),
  });
});

router.get("/myquizes",restrictToLoggedinUserOnly, async (req, res) => {
  return res.render("myquizes",{
    user:req.user,
    quizes: await userQuizes(req.user._id),
  });
});
router.get("/leaderboard",async (req, res) => {
  return res.render("leaderboard",{
    user:req.user,
    allusers: await User.find({}).sort({ rating: -1 }).then(users => users.map(user => ({
      name: user.name || "Anonymous",
      rating: user.rating || 0,
    }))),
  });
});
router.get("/about", (req, res) => {
  return res.render("about",{
    user:req.user,
  });
});
router.get("/contact", (req, res) => {
  return res.render("contact",{
    user:req.user,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;