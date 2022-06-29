const mongoose = require("mongoose");

const TripDetailsschema = new mongoose.Schema(
    {

    }
);

const TripDetailsModel = new mongoose.model("TripDetails", TripDetailsschema);
module.exports = TripDetailsModel;