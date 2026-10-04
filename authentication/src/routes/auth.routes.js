const express = require("express");
const {register,getMe,refreshToken,logout} = require("../controllers/auth.controller");
const authRouter = express.Router();

/**
 * POST /api/auth/register
 */
authRouter.post("/register", register);

/**
 * GET /api/auth/get-me
 */
authRouter.get("/get-me", getMe);

/**
 * GET /api/auth/refresh-token
 */
authRouter.get("/refresh-token", refreshToken );

/**
 * Get /api/auth/logout
 */
authRouter.get("/logout", logout );

module.exports = authRouter;