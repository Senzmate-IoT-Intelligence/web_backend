const mongoose = require("mongoose");

const employeeschema = new mongoose.Schema(
  {
    employeeID: {
      type: String,
    },

    role: {
      type: String,
    },

    name: {
      type: String,
    },

    department: {
      type: String,
    },
    contactnumber: {
      type: String,
    },
    occupation: {
      type: String,
    },
    email: {
      type: String,
    },
    accesspermissions: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const empModel = new mongoose.model("EMP", employeeschema);
module.exports = empModel;
