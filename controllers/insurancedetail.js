const express = require("express");
const router = express.Router();
const INSURANCE = require("../models/insurancedetail");

const insuranceCntrl = {
  createinsurancedetail: async (req, res) => {
    console.log(req.body);
    try {
      const { monthlypremium, purchasedate, enddate, value, customerid } =
        req.body;

      const insurance = new INSURANCE({
        monthlypremium,
        purchasedate,
        enddate,
        value,
        customerid,
      });
      await insurance.save();

      console.log(monthlypremium, purchasedate, enddate, value, customerid);
      return res
        .status(200)
        .json({ msg: "insurancedetail Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allinsurancedetail: async (req, res) => {
    try {
      const insurance = await INSURANCE.find();
      res.send(insurance);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  show: async (req, res) => {
    try {
      let insuranceID = req.params.id;
      /*   find({ customerid: vehicleID });  */
      const insuranceData = INSURANCE.findOne({ customerid: insuranceID }).then(
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

module.exports = insuranceCntrl;
