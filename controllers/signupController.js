const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.sign_up_form_get = async (req, res, next) => {
    res.render("sign-up-form")
}

exports.sign_up_form_post = [
    body("email", "email must not be empty")
        .trim()
        .isLength({min: 1})
        .isEmail()
        .normalizeEmail()
        .escape(), 
    body("username", "username must not be empty")
        .trim()
        .isLength({min: 1})
        .escape(), 
    body("password", "password must not be empty")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("passConfirm", "password do not match")
        .trim()
        .isLength()
        .escape()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password does not match");
            }

            return true;
        }), 
    
    async (req, res, next) => {
        console.log("in the async function");
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("in if statement")
            try {
                res.render("sign-up-form", {user})
            } catch(err) {
                next(err);
            }
        }

        bcrypt.hash(`${req.body.password}`, 10, async (err, hashedPassword) => {
            if (err) {
                console.log(error);
            }

            const user = new User({
                email: req.body.email, 
                username: req.body.username, 
                password: hashedPassword,
            })

            try {
                console.log("saving user");
                console.log(user);
                const userSave = await user.save();
                console.log(userSave);
                res.redirect("/");
            } catch(err) {
                next(err)
            }
        })  
    }
]