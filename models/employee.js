const mongoose = require("mongoose");

const employeeschema = new mongoose.Schema(
  {
     
    role: {
      type: String,
     
    },

    username: {
      type: String,
     
    },

    deparment: {
      type: String,
   
    },
    statuss: {
      type: String,
    },
    posstion: {
      type: String,
      
    },
    email: {
      type: String,
    
    },

    

  },

  {
    timestamps: true,
  }
);

const empModel = new mongoose.model("EMP", employeeschema);
module.exports = empModel;