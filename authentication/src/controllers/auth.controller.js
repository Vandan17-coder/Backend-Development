const User = require("../models/User.model")
const bcrypt = require('bcrypt');
const config = require("../config/config");
const jwt = require("jsonwebtoken")

const register = async(req, res) => {
    try {
        const {name,email,password} = req.body;

        const isAlreadyRegistered = await User.findOne({
            $or: [
                {name},
                {email}
            ]
        })

        if(isAlreadyRegistered){
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const accessToken = jwt.sign(
            {
                id: user._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "15min"
            }
        )

        const refereshToken = jwt.sign(
            {
                id: user._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.cookie("refereshToken", refereshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(201).json({
            message: "user register successfully",
            user,
            accessToken
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

const getMe = async (req,res) => {
     
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findOne({
        _id: decoded.id
    });

    res.status(200).json({
        message: "user fetched successfully",
        user
    })
}

const refereshToken = async(req, res) => {
    const refereshToken = req.cookies.refereshToken;
    console.log(req.cookies);
    if(!refereshToken) {
        return res.status(401).json({
            message: "referesh token not found"
        })
    }

    const decoded = jwt.verify(refereshToken, config.JWT_SECRET);

    const accessToken = jwt.sign({
            id: decoded.id
        }, config.JWT_SECRET,
        {  
            expiresIn: "15m"
        }
    )

    const newRefereshToken= jwt.sign({
            id: decoded.id
        }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.cookie("refereshToken", newRefereshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

    res.status(200).json({
        message: "Access token refereshed successfully",
        accessToken
    })
}

module.exports = {register,getMe,refereshToken};