const express = require("express");
const vehicleModel = require("../models/vehicle");
const router = express.Router();
const VEHICLE = require("../models/vehicle");

const vehicleCntrl = {
  createvehicle: async (req, res) => {
    console.log(req.body);
    try {
      const {
        vehiclenumber,
        manufacturedyear,
        chassisnumber,
        value,
        customerid,
      } = req.body;

      const vehi = new VEHICLE({
        vehiclenumber,
        manufacturedyear,
        chassisnumber,
        value,
        customerid,
      });
      await vehi.save();

      console.log(
        vehiclenumber,
        manufacturedyear,
        chassisnumber,
        value,
        customerid
      );

      return res.status(200).json({ msg: "Vehicle Detail Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allvehicle: async (req, res) => {
    try {
      const vehi = await VEHICLE.find();
      res.send(vehi);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  show: async (req, res) => {
    try {
      let vehicleID = req.params.id;
      /*   find({ customerid: vehicleID });  */
      const vehicleData = VEHICLE.findOne({ customerid: vehicleID }).then(
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

  //update an employee
  update: async (req, res) => {
    console.log(req.body);
    try {
      let vehicleID = req.params.id;
      console.log(vehicleID);

      let updatedData = {
        vehiclenumber: req.body.vehiclenumber,
        manufacturedyear: req.body.manufacturedyear,
        Chassisnumber: req.body.chassisnumber,
        Value: req.body.value,
      };
      EMPLOYEE.findByIdAndUpdate(vehicleID, updatedData).then(() => {
        return res.json({
          message: "Vehicle Detail updated successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  // delete an employee
  destroy: async (req, res) => {
    try {
      let vehicleID = req.params.id;
      vehicleModel.findByIdAndRemove(vehicleID).then(() => {
        res.json({
          message: "Employee deleted successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

module.exports = vehicleCntrl;
