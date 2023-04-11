const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  DATABASE_PASS: process.env.DATABASE_PASS,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_DATABASE: "eternalight-infotech",
  JWTSECRETKEY: process.env.JWTSECRETKEY,
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  DATABASE_PASS: process.env.DATABASE_PASS,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_DATABASE: "eternalight-infotech",
  JWTSECRETKEY: process.env.JWTSECRETKEY,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports = process.env.ETERNALIGHT_ENVIRONMENT ? production : development;
