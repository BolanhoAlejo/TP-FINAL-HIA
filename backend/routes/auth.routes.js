const express = require("express");
const loginValidation = require("../middleware/loginValidationMiddleware");
const loginSchema = require("../schemas/loginSchema");
const authCtrl = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", loginValidation(loginSchema), authCtrl.login);
authRouter.post("/register", loginValidation(loginSchema), authCtrl.register);
authRouter.get("/logout", authCtrl.logout);

module.exports = authRouter;
