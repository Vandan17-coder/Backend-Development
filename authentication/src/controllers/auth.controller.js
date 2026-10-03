const User = require("../models/User.model")
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");

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

        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        })
        
        const accessToken = jwt.sign(
            {
                id: user._id,
                sessionId: session._id
            },
            config.JWT_SECRET,
            {
                expiresIn: "15min"
            }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
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

const refreshToken = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    
    if(!refreshToken) {
        return res.status(401).json({
            message: "refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }

    const accessToken = jwt.sign({
            id: decoded.id
        }, config.JWT_SECRET,
        {  
            expiresIn: "15m"
        }
    )

    const newrefreshToken= jwt.sign({
            id: decoded.id
        }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    const newrefreshTokenHash = crypto.createHash("sha256").update(newrefreshToken).digest("hex");

    session.refreshTokenHash = newrefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newrefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken
    })
}

const logout = async(req, res) => {

    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(400).json({
            message: "Refresh token not found"
        })
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out successfully"
    })
}

module.exports = {register,getMe,refreshToken,logout};