const express = require("express");
const router = express.Router();
const passport = require("passport")

router.post("/login", passport.authenticate("local", { 
    successRedirect: "/", 
    failureRedirect: "/signup" 
}))

module.exports = router;