const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.render("home",{
    user:req.user,
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