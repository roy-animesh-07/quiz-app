const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const {checkForAuthenticationCookie} = require("./middlewares/auth");
app.use(checkForAuthenticationCookie("token"));

//routes
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const quizRoute = require("./routes/quiz");



app.use("/user",userRoute);
app.use("/",staticRoute);
app.use("/quiz",quizRoute);

app.listen(PORT,() => {
    console.log(`server started at http://localhost:${PORT}`);
})