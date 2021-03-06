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
      const acciddents = await ACCIDENT.find();
      res.send(acciddents);
      console.log(acciddents);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  /*getOrdersByDate: (req, res) => {
    const weekAgoDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const aggregatorOpts = [
      {
        $match: {
          createdAt: { $gte: weekAgoDate, $lt: new Date() },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ];

    Order.aggregate(aggregatorOpts)
      .then((result) => {
        const dateArr = new Array(7)
          .fill(0)
          .map((_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000))
          .map((e) => {
            const date = e.toISOString().split("T")[0];
            const obj = result.find((f) => f._id === date);
            if (obj) {
              return obj;
            }

            return { _id: date, count: 0 };
          });

        return successResponse(res.dateArr.reverse());
      })
      .catch((err) => {
        return errorResponse(res, null, null, err);
      });
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
  },*/
};

module.exports = accidentCntrl;
