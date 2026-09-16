const User = require("../models/User")

const register = async(req, res) => {
    try {
        const {name,email,password} = req.body;

        const user = await User.create({
            name,
            email,
            password
        });
        
        res.status(201).json({
            message: "user register successfully",
            user
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: "Failed to create a user",
            error: error.message
        })
    }
}

module.exports = {register};