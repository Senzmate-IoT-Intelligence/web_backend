const mongoose = require("mongoose");

const AccidentDetailsschema = new mongoose.Schema(
    {
            Accidentid: {
                type: Number,
                required: true
            },

            Tripid: {
                type: Number,
                required: true
            },

            Location_longitude:{
                type:String,
                required:true
            },

            Location_latitude:{
                type:String,
                required:true
            },

            date:{
                type: Date,
                default: Date.now
            },

    }
);

const AccidentModel = new mongoose.model("Accident_Mobile", AccidentDetailsschema);
module.exports = AccidentModel;