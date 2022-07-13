const mongoose = require("mongoose");

const insurancedetailchema = new mongoose.Schema(
  {
    monthlypremium: {
      type: String,
    },

    purchasedate: {
      type: Date,
    },

    enddate: {
      type: Date,
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

const insuranceModel = new mongoose.model("INSURANCE", insurancedetailchema);
module.exports = insuranceModel;
