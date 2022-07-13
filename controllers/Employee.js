const express = require("express");
const router = express.Router();
const EMPLOYEE = require("../models/employee");
const { phone } = require("phone-lk");

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

      if (
        !employeeID ||
        !role ||
        !name ||
        !department ||
        !contactnumber ||
        !occupation ||
        !email ||
        !accesspermissions
      ) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      const existingemployee = await EMPLOYEE.findOne({ employeeID });
      console.log(existingemployee);
      if (existingemployee) {
        return res.status(400).json({ error: "EmployeeID already have exits" });
      }
      if (!employeeidvalidate(employeeID)) {
        return res.status(400).json({ error: "Invalid Employee Id Format" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "invalid email check again" });
      }

      if (!validcontactnumber(req.body.contactnumber)) {
        return res.status(400).json({ error: "invalid contact number" });
      }

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

  checkid: async (req, res) => {
    try {
      const { employeeID } = req.body;
      const existingEmployee = await EMPLOYEE.findOne({ employeeID });
      console.log(existingEmployee);
      if (existingEmployee) {
        return res.status(200).json({
          msg: "Please fill the signup details to register",
          data: {
            role: existingEmployee.role,
            email: existingEmployee.email,
          },
        });
      } else {
        return res.status(400).json({
          error:
            "Employee Id is not available in the system. Please contact the system administrator",
        });
      }
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
      let employeeeID = req.params.id;
      console.log(employeeeID);

      let updatedData = {
        name: req.body.name,
        department: req.body.deparment,
        contactnumber: req.body.contactnumber,
        occupation: req.body.occupation,
        email: req.body.email,
      };

      const { name, department, contactnumber, occupation, email } = req.body;

      if (!name || !department || !contactnumber || !occupation || !email) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "invalid email check again" });
      }

      if (!validcontactnumber(req.body.contactnumber)) {
        return res.status(400).json({ error: "invalid contact number" });
      }

      EMPLOYEE.findByIdAndUpdate(employeeeID, updatedData).then(() => {
        return res.status(200).json({
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

/*function employeeidvalidate(employeeID) {
  const idRegex = new RegExp(/^\d{3}[A,C,M]{1}$/);

  if (idRegex.test(employeeID)) {
    return true;
  } else {
    return false;
  }
}*/

function employeeidvalidate(employeeID) {
  const idRegex = new RegExp(/^\d{1}[A,C,M]{1}$/);
  const idRegex2 = new RegExp(/^\d{2}[A,C,M]{1}$/);
  const idRegex3 = new RegExp(/^[1}{1}[0]{1}[0]{1}[A,C,M]{1}$/);

  if (
    idRegex.test(employeeID) ||
    idRegex2.test(employeeID) ||
    idRegex3.test(employeeID)
  ) {
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

module.exports = empCntrl;
