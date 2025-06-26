const {setUser,getUser} = require("../serivce/auth");
const Quiz = require("../models/quiz");
const QuizResponse = require("../models/quizresponse");

async function restrictToLoggedinUserOnly(req,res,next) {
    const userUid = req.cookies?.uid;
    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    req.user = user;
    next();
}
async function isResultOut(req,res,next) {
    const { qid, uid } = req.query;
    try {
        const quiz = await Quiz.findById(qid).populate("questions");
        if (!quiz) {
            return res.status(404).send("Quiz not found");
        }
        if(!quiz.resultOut){
            return res.redirect("/myquizes");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
    next();
}

module.exports ={
    restrictToLoggedinUserOnly,
    checkAuth,
    isResultOut,
}