const mongoose = require("mongoose");

const paymentschema = new mongoose.Schema(
  {
    paymentNo: {
      type: String,
      required: true,
    },
    
    paymentDate: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    
    paymentAmount: {
      type: String,
      required: true,
    },
    paymentTime: {
      type: String,
      required: true,
    },
    idNumber: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const paymentModel = new mongoose.model("Payment", paymentschema);
module.exports = paymentModel;
