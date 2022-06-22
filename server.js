const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const dbconnect = require("./config/db");
const userRoute = require("./routes/userRoute");
const empRoute = require("./routes/emprouters");
const paymentRoute = require("./routes/paymentrouters");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/employee", empRoute);
app.use("/api/payment", paymentRoute);

dbconnect();

app.get("/", (req, res) => {
  res.send("Hi");
  console.log(req);
});

app.listen(process.env.PORT, () => {
  console.log("server has been started");
});
