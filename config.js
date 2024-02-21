
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI

console.log("MONGO_URI=>", MONGO_URI);
console.log("PORT=>", PORT);
module.exports = {
  PORT,
  MONGO_URI,
};
