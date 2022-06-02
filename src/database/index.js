const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connected!");
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
