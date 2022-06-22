const mongoose = require("mongoose");

const accidentschema = new mongoose.Schema(
  {
    id: {
      type: Integer,
      required: true,
    },

    day: {
      type: Date,
      required: true,
    },
    accident_count: {
      type: Integer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const accidentModel = new mongoose.model("Accident", accidentschema);
module.exports = accidentModel;
