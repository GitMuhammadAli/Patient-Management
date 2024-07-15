const mongoose = require("mongoose");
const dotenv = require("dotenv");
const trycatchAsync = require("../server/middleware/TryCatchasync");

mongoose.set("strictQuery", false);
dotenv.config();

exports.connectDb = trycatchAsync(async () => {
  await mongoose
    .connect(process.env.DB_URL  )
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("error in connecting to database", err);
    });
});
