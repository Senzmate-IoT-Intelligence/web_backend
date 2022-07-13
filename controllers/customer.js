const express = require("express");
const router = express.Router();
const CUSTOMER = require("../models/customer");

const custCntrl = {
  createcustomer: async (req, res) => {
    try {
      const { name, email, nic, contactnumber, insurancetype } = req.body;

      if (!name || !email || !nic || !contactnumber || !insurancetype) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "invalid email check again" });
      }

      if (!validateNic(nic)) {
        return res.status(400).json({ error: "invalid nic check again" });
      }

      if (!validcontactnumber(contactnumber)) {
        return res.status(400).json({ error: "invalid contact number" });
      }

      const emp = new CUSTOMER({
        name,
        email,
        nic,
        contactnumber,
        insurancetype,
      });
      await emp.save();

      console.log(name, email, nic, contactnumber, insurancetype);
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
      };

      const { name, email, nic, contactnumber, insurancetype } = req.body;

      if (!name || !email || !nic || !contactnumber || !insurancetype) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "invalid email check again" });
      }

      if (!validateNic(req.body.nic)) {
        return res.status(400).json({ error: "invalid nic check again" });
      }

      if (!validcontactnumber(req.body.contactnumber)) {
        return res.status(400).json({ error: "invalid contact number" });
      }

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

function validateNic(nic) {
  const nicRegex = new RegExp(/^\d{9}[X,x,V,v]{1}$/);
  const nicRegex2 = new RegExp(/^[1]{1}[9]{1}\d{10}$|[2]{1}[0]{1}\d{10}$/);

  if (nicRegex.test(nic) || nicRegex2.test(nic)) {
    return true;
  } else {
    return false;
  }
}

function validcontactnumber(contactnumber) {
  const phoneNoRegex = new RegExp(/^[0]{1}\d{9}$/);

  if (phoneNoRegex.test(contactnumber)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = custCntrl;
