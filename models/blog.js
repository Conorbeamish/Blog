var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    title: String,
    image1: String,
    image2: String,
    content: String,
    author: {
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    date: String
});
var Blog= mongoose.model("Blog", blogSchema);

module.exports = mongoose.model("Blog", blogSchema);