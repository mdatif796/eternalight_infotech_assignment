const express = require("express");
const app = express();

const db = require("./config/database");

app.listen(process.env.PORT || 8000, (err) => {
  return err
    ? console.log("Error in connecting express server on port:", 8000)
    : console.log("Express server is successfully running on port:", 8000);
});
