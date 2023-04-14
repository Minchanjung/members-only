const User = require("../models/User");
const { body, validationResult } = require("express-validator");

exports.sign_up_form_get = async (req, res, next) => {
    res.render("sign-up-form")
}

/*exports.sign_up_form_post = async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email, 
            username: req.body.username, 
            password: req.body.password,
        })

        const result = user.save();
        res.redirect("/");
    } catch(err) {
        return next(err);
    }
}*/

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

        const user = new User({
            email: req.body.email, 
            username: req.body.username, 
            password: req.body.password,
        })

        if (!errors.isEmpty()) {
            console.log("in if statement")
            try {
                res.render("sign-up-form", {user})
            } catch(err) {
                next(err);
            }
        }
        try {
            console.log("saving user");
            console.log(user);
            const userSave = await user.save();
            console.log(userSave);
            res.redirect("/");
        } catch(err) {
            next(err)
        }
    }
]