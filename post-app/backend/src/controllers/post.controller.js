const Post = require("../models/post.model");

const getPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json({
        message: "Posts fetched successfully",
        posts
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch posts",
            error: error.message
        });
    }
};

const createPost = async (req, res) => {
    try {
        const { caption, image } = req.body;

        const post = await Post.create({
            caption,
            image
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};

module.exports = {
    getPosts,
    createPost
};