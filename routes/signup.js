const express = require("express");
const router = express.Router();

router.get('/signup', function(req, res, next) {
    res.render("sign-up-form")
})

module.exports = router;