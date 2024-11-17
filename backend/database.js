const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
module.exports = mongoose;
