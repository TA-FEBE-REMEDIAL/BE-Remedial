const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/index.js");
require("dotenv").config();

// Enable if want run local
// const { createServer } = require("http");

// For Hosting me, disable if want to run LOCAL
const { createServer } = require("https");
const fs = require("fs");

// Load SSL certificate
// For Hosting me, disable if want to run LOCAL
const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/remedial.id.suika.pw/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/remedial.id.suika.pw/fullchain.pem"
  ),
};

const app = express();
// Enable if want run local
// const PORT = 5000;
// const server = createServer(app);

// For Hosting me, disable if want to run LOCAL
const PORT = 443;
const server = createServer(options, app);

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.use("/api", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is online...",
  });
});

// For Hosting me, disable if want to run LOCAL
app.use(express.static(path.join(__dirname, "../FE-REMEDIAL/dist")));
app.use("/", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "../FE-REMEDIAL/dist", "index.html")
  );
});

server.listen(PORT, () => console.log(`Web running at port ${PORT}`));
