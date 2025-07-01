const express = require("express");
const User = require("../models/user");
const {generateToken,validateToken} = require("../serivce/authi");
const { createHmac, randomBytes } = require("crypto");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  await User.create({
    name,
    email,
    hashedPassword,
    salt,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email});

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const userHashedPassword = user.hashedPassword;
  const salt = user.salt;
  const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
  if(userHashedPassword!==userProvidedHash) {
    console.log("notworking");
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const token = generateToken(user);
  res.cookie("token",token);
  return res.redirect("/");
}
async function handlecookieereset(req, res) {
  res.clearCookie("token");
  res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handlecookieereset,
};
