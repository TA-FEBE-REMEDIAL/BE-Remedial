const express = require("express");
const FileUpload = require("express-fileupload");
const { createServer } = require("http");
const db = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index.js");
const multer = require("multer");
require("dotenv").config();
const app = express();
const server = createServer(app);
// const corsOptions = {
//   origin: "http://localhost:5173/",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// try {
//   await db.authenticate();
//   console.log("Database Connected...");
// } catch (error) {
//   console.error(error);
// }

app.use(cors());
app.use(multer({ dest: "public/images" }).single("image"));

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(FileUpload());

server.listen(5000, () => console.log("Server running at port 5000"));
