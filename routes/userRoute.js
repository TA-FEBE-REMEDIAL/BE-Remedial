const express = require("express");
const routes = express();
const { getUsers, Register, Login, Logout } = require("../controller/Users.js");
const verifyToken = require("../middleware/VerifyToken.js");
const refreshToken = require("../controller/RefreshToken.js");

routes.get("/users", verifyToken, getUsers);
routes.post("/users", Register);
routes.post("/login", Login);
routes.get("/token", refreshToken);
routes.delete("/logout", Logout);

module.exports = routes;
