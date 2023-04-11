// require("dotenv").config();
const mongoose = require("mongoose");
const env = require("./environment");

// if connects with the database
main()
  .then(() => {
    return console.log("Database connected successfully with the server.");

    // if error occurs while connecting with the database
  })
  .catch((err) => {
    return console.log(`Error in connecting with the database: ${err}`);
  });

// function for connecting with the database
async function main() {
  await mongoose.connect(
    `mongodb+srv://${env.MONGO_USER}:${env.DATABASE_PASS}@cluster0.lymyd.mongodb.net/${env.MONGO_DATABASE}?retryWrites=true&w=majority`
  );
}
