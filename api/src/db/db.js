const mongoose = require("mongoose");

async function connectDB() {
    
    //this whole string inside connect() will connect server to the hally database means it connects server to the database
    //if the there is no databse of that name in the cluster than it will create new one with that name
    await mongoose.connect("mongodb+srv://patelvandan1705_db_user:bYRZeMyO3QSqAyeG@backend.zk5t773.mongodb.net/hally")

    console.log("Connected to DB")
}

module.exports = connectDB