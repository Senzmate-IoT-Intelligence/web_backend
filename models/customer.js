const mongoose = require("mongoose");

const customerschema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
    },

    nic: {
      type: String,
    },
    contactnumber: {
      type: String,
    },

    insurancetype: {
      type: String,
    },
    numberofaccidents: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

const custModel = new mongoose.model("CUST", customerschema);
module.exports = custModel;
