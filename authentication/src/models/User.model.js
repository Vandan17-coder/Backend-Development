const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username is required"],
            unique: [true, "Username must be unique"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);