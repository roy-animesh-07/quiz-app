const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//my models
const User = require("./models/user");

//db connect
mongoose.connect("mongodb://localhost:27017/quiz-app").then(() => {
    console.log("database connected");
})

//server
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth");

//routes
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const quizRoute = require("./routes/quiz");



app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);
app.use("/quiz",restrictToLoggedinUserOnly,quizRoute);

app.listen(PORT,() => {
    console.log(`server started at http://localhost:${PORT}`);
})