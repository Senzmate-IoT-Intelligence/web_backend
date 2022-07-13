const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const connectDb = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://sach:kXqd5ubHMreI3a6q@cluster0.uhjvch3.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
