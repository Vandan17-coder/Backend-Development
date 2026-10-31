const express = require("express");
const { register, login, getMe, refreshToken, logout, logoutAll } = require("../controllers/auth.controller");
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
authRouter.get("/refresh-token", refreshToken);

/**
 * Get /api/auth/logout
 */
authRouter.get("/logout", logout);

/**
 * Get /api/auth/logoutAll
 */
authRouter.get("/logoutAll", logoutAll);

/**
 * POST /api/auth/login
 */
authRouter.post("/login", login);
/**
 * POST /api/auth/verify
 */
authRouter.post("/verify", verify);

module.exports = authRouter;