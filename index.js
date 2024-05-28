const express = require("express");
const { createServer } = require("http");
const db = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index.js");
require("dotenv").config();
const app = express();
const server = createServer(app);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// try {
//   await db.authenticate();
//   console.log("Database Connected...");
// } catch (error) {
//   console.error(error);
// }

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

server.listen(5000, () => console.log("Server running at port 5000"));
