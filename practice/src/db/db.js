const mongoose = require("mongoose")

async function connectDB(){

    await mongoose.connect("mongodb+srv://patelvandan1705_db_user:bYRZeMyO3QSqAyeG@backend.zk5t773.mongodb.net/hally")

    console.log("MongoDB connected")
}

module.exports = connectDB