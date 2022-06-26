const express = require("express");
const router = express.Router();
const EMPLOYEE = require("../models/employee");

const empCntrl = {
  createemployee: async (req, res) => {
    console.log(req.body);
    try {
      const {
        employeeID,
        role,
        name,
        department,
        contactnumber,
        occupation,
        email,
        accesspermissions,
      } = req.body;

      const emp = new EMPLOYEE({
        employeeID,
        role,
        name,
        department,
        contactnumber,
        occupation,
        email,
        accesspermissions,
      });
      await emp.save();

      console.log(
        employeeID,
        role,
        name,
        department,
        contactnumber,
        occupation,
        email,
        accesspermissions
      );
      return res.status(200).json({ msg: "Employee Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allemployees: async (req, res) => {
    try {
      const emps = await EMPLOYEE.find();
      res.send(emps);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  show: async (req, res) => {
    try {
      let employeeID = req.params.id;
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
    console.log(req.body);
    try {
      let employeeID = req.params.id;
      console.log(employeeID);

      let updatedData = {
        employeeID: req.body.employeeID,
        role: req.body.role,
        name: req.body.name,
        department: req.body.deparment,
        contactnumber: req.body.contactnumber,
        occupation: req.body.occupation,
        email: req.body.email,
        accesspermissions: req.body.accesspermissions,
      };
      EMPLOYEE.findByIdAndUpdate(employeeID, updatedData).then(() => {
        return res.json({
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
      let employeeID = req.params.id;
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

module.exports = empCntrl;
