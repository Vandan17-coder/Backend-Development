const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(error){
        console.log("MongoDb connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;