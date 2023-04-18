const mongoose = require("mongoose");
const { DateTime } = require("luxon")

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String }, 
    message: { type: String }, 
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    postDate: { type: Date, default: Date.now}
})

MessageSchema.virtual("dateTime").get(function () {
    return DateTime.toISO(this.postDate).toLocaleString()
})

module.exports = mongoose.model("Message", MessageSchema);