const express = require("express");
const router = express.Router();
const CUSTOMER = require("../models/customer");

const custCntrl = {
  createcustomer: async (req, res) => {
    try {
      const { customerID, name, email, nic, contactnumber, insurancetype } =
        req.body;

      const emp = new CUSTOMER({
        customerID,
        name,
        email,
        nic,
        contactnumber,
        insurancetype,
      });
      await emp.save();

      console.log(customerID, name, email, nic, contactnumber, insurancetype);
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

  //update an employee
  update: async (req, res) => {
    try {
      let customerID = req.body.customerID;

      let updatedData = {
        customerID: req.body.customerID,
        name: req.body.name,
        email: req.statuss.email,
        nic: req.body.nic,
        contactnumber: req.body.contactnumber,
        insurancetype: req.body.insurancetype,
      };
      CUSTOMER.findByIdAndupdate(customerID, { $set: updatedData }).then(() => {
        res.json({
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
      let customerID = req.body.customerID;
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
