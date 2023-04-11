const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const logger = require("morgan");
const app = express();
app.use(cors());
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));

const db = require("./config/database");
const env = require("./config/environment");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use("/", require("./routes"));

app.listen(process.env.PORT || 8000, (err) => {
  return err
    ? console.log("Error in connecting express server on port:", 8000)
    : console.log("Express server is successfully running on port:", 8000);
});
