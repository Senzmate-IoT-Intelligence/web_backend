const mongoose = require("mongoose");

const vehicleschema = new mongoose.Schema(
  {
    vehiclenumber: {
      type: String,
    },

    manufacturedyear: {
      type: String,
    },

    chassisnumber: {
      type: String,
    },

    value: {
      type: String,
    },

    customerid: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const vehicleModel = new mongoose.model("VEHICLE", vehicleschema);
module.exports = vehicleModel;
