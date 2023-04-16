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

    
]