const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String }, 
    message: { type: String }, 
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    postDate: { type: Date, default: Date.now}
})

/*MessageSchema.virtual("datetime").get(function () {
    return DateTime;
})*/

module.exports = mongoose.model("Message", MessageSchema);