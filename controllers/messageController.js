const User = require("../models/User");
const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");

exports.create_message_post = [
    body("title", "title must not be empty")
        .trim()
        .isLength({min: 1})
        .escape(), 
    body("message", "message must not be empty") 
        .trim()
        .isLength({min: 1})
        .escape(), 

    async (req, res, next) => {
        console.log(req);
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title, 
            message: req.body.message, 
            author: req.user._id,
        })

        if (!errors.isEmpty()) {
            try {
                res.render("/", {message})
            } catch(err) {
                next(err);
            }
        }

        try {
            const messageSave = await message.save();
            console.log(messageSave);
            res.redirect("/")
        } catch(err) {
            next(err);
        }
    }
]

exports.get_messages = async (req, res, next) => {
    const result = await(Message.find({}).sort({date:1}).populate("author").exec());
    res.render("index", {messages: result})
}