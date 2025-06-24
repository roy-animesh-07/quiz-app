const express = require("express");
const {handleUserSignup,handleUserLogin,handlecookieereset} = require("../controllers/user.js");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/logout",handlecookieereset);

module.exports = router;