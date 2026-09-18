const express = require("express");
const {register,getMe,refereshToken} = require("../controllers/auth.controller");
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
 * GET /api/auth/referesh-token
 */
authRouter.get("/referesh-token", refereshToken );

module.exports = authRouter;