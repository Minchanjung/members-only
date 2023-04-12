const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String }, 
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
})

/*MessageSchema.virtual("datetime").get(function () {
    return DateTime;
})*/

module.exports = mongoose.model("Message", MessageSchema);