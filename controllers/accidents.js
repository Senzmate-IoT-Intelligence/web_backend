const express = require("express");
const router = express.Router();
const ACCIDENT = require("../models/accidents");

const accidentCntrl = {
  createaccident: async (req, res) => {
    try {
      const { id, day, accident_count } = req.body;

      const emp = new ACCIDENT({
        id,
        day,
        accident_count,
      });
      await emp.save();

      console.log(id, day, accident_count);

      return res.status(200).json({ msg: "Accident Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allaccident: async (req, res) => {
    try {
      const emps = await ACCIDENT.find();
      res.send(emps);
      console.log(emps);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  show: async (req, res) => {
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
  },
};

module.exports = accidentCntrl;
