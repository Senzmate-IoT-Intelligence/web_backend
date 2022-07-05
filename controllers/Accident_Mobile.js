const express = require("express");
const router = express.Router();
const Accident_Mobile = require("../models/Accident_Mobile");

const AccidentDetailsCntrl = {
  createAccidentDetail: async (req, res) => {
    console.log(req.body);
    try {
      const {  Tripid, Location_longitude, Location_latitude, date } = req.body;

      const lastAccidentData = await AccidentDetails.find().sort({$natural:-1}) ;

      let Accidentid = lastAccidentData == "" ? 1 : lastAccidentData[0].Accidentid + 1

      const AccidentDetails = new AccidentDetails({
        Accidentid,
        Tripid,
        Location_longitude,
        Location_latitude,
        date
      });
       await AccidentDetails.save();

      return res.status(200).json({ msg: "Accident Detail Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  show: async (req, res) => {
    try {
      //let TripID = req.params.id;
      /*   find({ customerid: vehicleID });  */
      const AccidentData = AccidentDetails.find().then(
        (response) => {
          res.json({
            response,
          });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

module.exports = AccidentDetailsCntrl;
