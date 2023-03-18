const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 4,
    },
    likes: {
        type: [String],
        default: [],
    },
    userId: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema)