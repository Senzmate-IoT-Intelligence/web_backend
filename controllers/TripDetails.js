const express = require("express");
const router = express.Router();
const TripDetails = require("../models/TripDetails");

const TripDetailsCntrl = {
  createTripDetail: async (req, res) => {
    console.log(req.body);
    try {
      const { Tripid, startingpoint, destination, date, distance } = req.body;

      const tripDetail = new TripDetails({
        Tripid,
        startingpoint,
        destination,
        date,
        distance,
      });
      await tripDetail.save();

      console.log(tripDetail);

      return res.status(200).json({ msg: "Trip Detail Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  show: async (req, res) => {
    try {
      let TripID = req.params.id;
      /*   find({ customerid: vehicleID });  */
      const TripData = TripDetails.findOne({ TripId: TripID }).then(
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

module.exports = TripDetailsCntrl;
