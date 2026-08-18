const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }    
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;