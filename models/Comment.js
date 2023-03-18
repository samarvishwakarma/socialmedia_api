const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        reuired: true,
    },
    userId: {
        type: String,
        reuired: true,
    },
    commentText: {
        type: String,
        reuired: true,
        min: 4,
    },

}, {timestamps: true})

module.exports = mongoose.model("Comment", CommentSchema)