// import express from "express";
// import { getUsers, Register, Login, Logout } from "../controller/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controller/RefreshToken.js";

// const router = express.Router();

// router.get("/users", verifyToken, getUsers);
// router.post("/users", Register);
// router.post("/login", Login);
// router.get("/token", refreshToken);
// router.delete("/logout", Logout);

// export default router;

const express = require("express");
const app = express();

const users = require("./userRoute.js");
const karya = require("./karyaRoute.js");

const url = "/api";

app.use(url, users);
app.use(url, karya);

module.exports = app;
