const mongoose = require("mongoose");

const tripschema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    day: {
      type: Date,
      required: true,
    },
    trip_count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tripModel = new mongoose.model("TRIP", tripschema);

module.exports = tripModel;
