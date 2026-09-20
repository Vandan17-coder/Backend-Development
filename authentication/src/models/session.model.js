const mongoose = require("mongoose");
const { refereshToken } = require("../controllers/auth.controller");


const sessionSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: [ true, "User is required" ]
    },
    refereshTokenHash: {
        type: String,
        required: [ true, "Referesh token hash is required" ]
    },
    ip: {
        type: String,
        required: [ ture, "IP address is required"]
    },
    userAgent: {
        type: String,
        required: [ true, "User agent is required" ]
    },
    revoked: {
        type: Boolean,
        default: false
    }
},{
        timestamps: true
})

const sessionModel = mongoose.model("session", sessionSchema);

module.exports = sessionModel;