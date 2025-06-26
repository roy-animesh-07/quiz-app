const Quiz = require("../models/quiz");
const QuizResponse = require("../models/quizresponse");

async function startQuiz(req,res) {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
        return res.status(404).send("Quiz not found");
    }
    res.render("liveQuiz", {
        user: req.user,
        quiz: quiz,
    });
}

async function submitQuiz(req, res) {
  const quizId = req.params.id;
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(404).send("Quiz not found");
  }

  const { answers } = req.body;
  let score = 0;

  // Create a map for quick lookup
  const questionMap = new Map();
  quiz.questions.forEach((q) => questionMap.set(String(q._id), q));

  answers.forEach(({ question, selectedOptions }) => {
    const q = questionMap.get(String(question));
    if (!q) return;

    const correctOptionIds = q.options
      .filter(opt => opt.isCorrect)
      .map(opt => String(opt._id));

    const selectedIds = (selectedOptions || []).map(id => String(id));

    // Check if selected matches exactly the correct ones (for multi-select)
    const isCorrect =
      selectedIds.length === correctOptionIds.length &&
      selectedIds.every(id => correctOptionIds.includes(id));

    if (isCorrect) score++;
  });

  const quizResponse = new QuizResponse({
    quiz: quiz._id,
    user: req.user._id,
    response: answers, // already in correct structure
    score,
    submittedAt: new Date()
  });

  await quizResponse.save();

  res.status(200).json({
    message: "Quiz submitted successfully",
    score,
    total: quiz.questions.length
  });
}


async function getStandings(req, res) {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
        return res.status(404).send("Quiz not found");
    }
    // Assuming standings are calculated based on scores stored in the database
    const standings = await Quiz.find({}).sort({ score: -1 }).limit(10);
    res.render("standings", {
        user: req.user,
        quiz: quiz,
        standings: standings,
    });
}
async function getResult(req, res) {
    const { qid, uid } = req.query;

    if (!qid || !uid) {
        return res.status(400).send("Missing quiz ID or user ID.");
    }

    try {
        const quiz = await Quiz.findById(qid).populate("questions");
        if (!quiz) {
            return res.status(404).send("Quiz not found");
        }

        const userResponse = await QuizResponse.findOne({
            quiz: qid,
            user: uid
        });

        if (!userResponse) {
            return res.status(404).send("User's response not found");
        }

        const standings = await QuizResponse.find({ quiz: qid })
            .sort({ score: -1 })
            .populate("user", "name email");

        res.render("veiwResult", {
            user: req.user || null,
            quiz: quiz,
            standings: standings,
            userResponse: userResponse
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    startQuiz,
    submitQuiz,
    getStandings,
    getResult,
};