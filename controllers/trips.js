const express = require("express");
const router = express.Router();
const TRIP = require("../models/trips");

const tripCntrl = {
  creattrip: async (req, res) => {
    try {
      const { id, day, trip_count } = req.body;

      const trip = new TRIP({
        id,
        day,
        trip_count,
      });
      await trip.save();

      console.log(id, day, trip_count);

      return res.status(200).json({ msg: "Trip Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  alltrip: async (req, res) => {
    try {
      const trips = await TRIP.find();
      res.send(trips);
      console.log(trips);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  /*show: async (req, res) => {
    try {
      let employeeID = req.body.employeeID;
      EMPLOYEE.findById(employeeID).then((response) => {
        res.json({
          response,
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  //update an employee
  update: async (req, res) => {
    try {
      let employeeID = req.body.employeeID;

      let updatedData = {
        employeeID: req.body.employeeID,
        role: req.body.role,
        name: req.body.name,
        department: req.statuss.deparment,
        contactnumber: req.body.contactnumber,
        occupation: req.body.occupation,
        email: req.body.email,
        accesspermissions: req.body.accesspermissions,
      };
      ACCIDENT.findByIdAndupdate(employeeID, { $set: updatedData }).then(() => {
        res.json({
          message: "Employee updated successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  // delete an employee
  destroy: async (req, res) => {
    try {
      let employeeID = req.body.employeeID;
      EMPLOYEE.findByIdAndRemove(employeeID).then(() => {
        res.json({
          message: "Employee deleted successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },*/
};

module.exports = tripCntrl;
