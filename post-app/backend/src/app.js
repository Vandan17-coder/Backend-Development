const express = require("express")
const postRoutes = require("./routes/post.routes");

const app = express()

// Middleware
app.use(express.json());

// Routes   
app.use("/api/posts", postRoutes);

module.exports = app;