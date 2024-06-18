const express = require("express");
const FileUpload = require("express-fileupload");
const { createServer } = require("http");
const db = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index.js");
require("dotenv").config();
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.static("public"));

app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(routes);

server.listen(5000, () => console.log("Server running at port 5000"));
