const mongoose = require("mongoose");

const customerschema = new mongoose.Schema(
  {
    customerID: {
      type: String,
    },

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
  },

  {
    timestamps: true,
  }
);

const empModel = new mongoose.model("CUST", customerschema);
module.exports = custModel;
