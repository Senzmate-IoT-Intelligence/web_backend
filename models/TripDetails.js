const mongoose = require("mongoose");

const TripDetailsschema = new mongoose.Schema(
    {
            Tripid: {
                type: Number,
                required: true
            },

            startingpoint:{
                type:String,
                required:true
            },

            destination:{
                type:String,
                required:true
            },

            date:{
                type: Date,
                default: Date.now
            },

            distance:{
                type:String,
                required:true
            }
    }
);

const TripDetailsModel = new mongoose.model("TripDetails", TripDetailsschema);
module.exports = TripDetailsModel;