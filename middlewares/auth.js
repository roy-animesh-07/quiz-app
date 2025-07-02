const Quiz = require("../models/quiz");
const QuizResponse = require("../models/quizresponse");
const {generateToken,validateToken} = require("../serivce/authi");
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}
async function onlyToLogedInUsers(req,res,next) {
    const tokenCookieValue = req.cookies["token"];
    if (!tokenCookieValue) {
        return res.redirect("/login");
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
}
async function restrictToAdminsOnly(req,res,next) {
    const tokenCookieValue = req.cookies["token"];
    if (!tokenCookieValue) {
        return res.redirect("/login");
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      if(userPayload.role!=="admin") {
        return res.redirect("/");
      }
    } catch (error) {}

    return next();
}

async function isResultOut(req,res,next) {
    const { qid, uid } = req.query;
    try {
        const quiz = await Quiz.findById(qid);
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
    restrictToAdminsOnly,
    onlyToLogedInUsers,
    checkForAuthenticationCookie,
    isResultOut,
}