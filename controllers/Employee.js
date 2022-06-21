const express = require("express");
const router = express.Router();
const EMPLOYEE = require("../models/employee");

const empCntrl = {
    createemployee: async (req, res) => {
    try {
      
      const {
        role,
         username,
        deparment,
        statuss,
        posstion,
        email,
  } = req.body;
     
      const emp = new EMPLOYEE({
        role,
        username,
        deparment,
        statuss,
        posstion,
        email,
       
       

      })
      await emp.save();
     
      console.log(  role,
        username,
        deparment,
        statuss,
        posstion,
        email,
       
        
        
        
        );
     return  res.status(200).json({ msg: "Employee dded Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  allemployees: async (req, res) => {
    try {
      const emps = await EMPLOYEE.find();
      res.send(emps);
      console.log(emps);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },


  show: async (req, res) => {
    try {
      let employeeID = req.body.employeeID 
         EMPLOYEE.findById(employeeID) 
         .then(response => { 
        res.json({
            response
          })
     })
    } catch (error) {
      res.status(400).json({ error: error });
    }

  },


  //update an employee 
 update: async (req, res) => {
  try {
    let employeeID = req.body.employeeID
  
    let updatedData = {
      username: req.body.username, 
      deparment: req.body.deparment,
      statuss: req.statuss.email, 
      posstion: req.body.posstion, 
      email: req.body.email
    }
    EMPLOYEE.findByIdAndupdate(employeeID, {$set: updatedData}) 
    .then(() => { 
    res.json({
    message: 'Employee updated successfully!'
    })
  
  })
  } catch (error) {
    res.status(400).json({ error: error });
  }

},


// delete an employee 
destroy: async (req, res) => {
  try {
    let employeeID = req.body.employeeID 
    EMPLOYEE. findByIdAndRemove(employeeID) .then(() => { res.json({
      message: 'Employee deleted successfully!'})})
  } catch (error) {
    res.status(400).json({ error: error });
  }
}





}










module.exports = empCntrl;