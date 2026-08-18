const getPosts = (req,res) => {
    res.status(200).json({
        message: "Posts fetched successfully"
    });
};

module.exports = {
    getPosts
};