const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

router.get('/signup', signupController.sign_up_form_get)

router.post('/signup', signupController.sign_up_form_post)

module.exports = router;