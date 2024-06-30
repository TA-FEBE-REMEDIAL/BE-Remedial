const express = require("express");
const FileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const { createServer } = require("http");
// const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/index.js");
require("dotenv").config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(FileUpload());
app.use(routes);

server.listen(5000, () => console.log("Server running at port 5000"));
