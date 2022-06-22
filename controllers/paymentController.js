const express = require("express");
const router = express.Router();
const PAYMENT = require("../models/payment");

const paymentCtrl = {
  createPayment: async (req, res) => {
    try {
      const {
        paymentNo,
        paymentDate,
        name,
        paymentAmount,
        paymentTime,
        idNumber,
      } = req.body;

      const pay = new PAYMENT({
        paymentNo,
        paymentDate,
        name,
        paymentAmount,
        paymentTime,
        idNumber,
      });
      await pay.save();

      console.log(
        paymentNo,
        paymentDate,
        name,
        paymentAmount,
        paymentTime,
        idNumber
      );
      return res.status(200).json({ msg: "Payment Added Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allPayment: async (req, res) => {
    try {
      const pays = await PAYMENT.find();
      res.send(pays);
      console.log(pays);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  //   show: async (req, res) => {
  //     try {
  //       let employeeID = req.body.employeeID
  //          EMPLOYEE.findById(employeeID)
  //          .then(response => {
  //         res.json({
  //             response
  //           })
  //      })
  //     } catch (error) {
  //       res.status(400).json({ error: error });
  //     }

  //   },

  //update an employee
  updatePayment: async (req, res) => {
    try {
      let paymentID = req.body.paymentID;

      let updatedData = {
        username: req.body.username,
        deparment: req.body.deparment,
        statuss: req.statuss.email,
        posstion: req.body.posstion,
        email: req.body.email,
      };
      PAYMENT.findByIdAndupdate(paymentID, { $set: updatedData }).then(() => {
        res.json({
          message: "Payment updated successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  // delete an employee
  deletePayment: async (req, res) => {
    try {
      let paymentID = req.body.paymentID;
      PAYMENT.findByIdAndRemove(paymentID).then(() => {
        res.json({
          message: "Payment deleted successfully!",
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

module.exports = paymentCtrl;
