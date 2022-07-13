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
        name,
      } = req.body;

      if (
        !vehiclenumber ||
        !manufacturedyear ||
        !chassisnumber ||
        !value ||
        !customerid ||
        !name
      ) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      if (!validateVehiclenumberpalte(vehiclenumber)) {
        return res.status(400).json({
          error: "invalid Sri Lanka Vehicle plate number check again!",
        });
      }

      if (!validateVIN(chassisnumber)) {
        return res.status(400).json({
          error:
            "invalid VIN check again!-VIN should have only A-Z, 0-9 characters, but not I, O, or Q Last 6 characters of VIN should be a number VIN should be 17 characters long ",
        });
      }

      const vehi = new VEHICLE({
        vehiclenumber,
        manufacturedyear,
        chassisnumber,
        value,
        customerid,
        name,
      });
      await vehi.save();

      console.log(
        vehiclenumber,
        manufacturedyear,
        chassisnumber,
        value,
        customerid,
        name
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

      const { vehiclenumber, manufacturedyear, chassisnumber, value } =
        req.body;

      if (!vehiclenumber || !manufacturedyear || !chassisnumber || !value) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      if (!validateVehiclenumberpalte(vehiclenumber)) {
        return res.status(400).json({
          error: "invalid Sri Lanka Vehicle plate number check again!",
        });
      }

      if (!validateVIN(chassisnumber)) {
        return res.status(400).json({
          error:
            "invalid VIN check again!-VIN should have only A-Z, 0-9 characters, but not I, O, or Q Last 6 characters of VIN should be a number VIN should be 17 characters long ",
        });
      }
      VEHICLE.findByIdAndUpdate(vehicleID, updatedData).then(() => {
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

function validateVehiclenumberpalte(vehiclenumber) {
  const re = /^(?:[a-zA-Z]{1,3}|(?!0*-)[0-9]{1,3})-[0-9]{4}(?<!0{4})$/;
  return re.test(vehiclenumber);
}

function validateVIN(chassisnumber) {
  const re =
    /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;
  return re.test(chassisnumber);
}

module.exports = vehicleCntrl;
