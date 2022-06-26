const express = require("express");
const router = express.Router();
const CUSTOMER = require("../models/customer");

const custCntrl = {
  createcustomer: async (req, res) => {
    try {
      const {
        name,
        email,
        nic,
        contactnumber,
        insurancetype,
        numberofaccidents,
      } = req.body;

      const emp = new CUSTOMER({
        name,
        email,
        nic,
        contactnumber,
        insurancetype,
        numberofaccidents,
      });
      await emp.save();

      console.log(
        name,
        email,
        nic,
        contactnumber,
        insurancetype,
        numberofaccidents
      );
      return res.status(200).json({ msg: "Customer Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allcustomers: async (req, res) => {
    try {
      const cust = await CUSTOMER.find();
      res.send(cust);
      console.log(cust);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  show: async (req, res) => {
    try {
      let customerID = req.params.id;
      CUSTOMER.findById(customerID).then((response) => {
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
      let customerID = req.params.id;
      console.log(customerID);

      let updatedData = {
        name: req.body.name,
        email: req.body.email,
        nic: req.body.nic,
        contactnumber: req.body.contactnumber,
        insurancetype: req.body.insurancetype,
        numberofaccidents: req.body.insurancetype,
      };
      CUSTOMER.findByIdAndUpdate(customerID, updatedData).then(() => {
        return res.json({
          message: "Customer updated successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  // delete an employee
  destroy: async (req, res) => {
    try {
      let customerID = req.params.id;
      CUSTOMER.findByIdAndRemove(customerID).then(() => {
        res.json({
          message: "Customer deleted successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

module.exports = custCntrl;
