const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCntrl = {
  userregister: async (req, res) => {
    try {
      const { role,username, email, password, confirmpassword } = req.body;

      if (!username || !email  || !password || !confirmpassword) {
        return res.status(400).json({ error: "please fill all the fields" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "invalid email check again" });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: "user already have exits" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "password  must be least 8 character" });
      }

      if (password !== confirmpassword) {
        return res.status(400).json({ error: "passsword does not match" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      console.log(passwordHash);

      const newUser = new User({
        role,
        username,
        email,
      
        password: passwordHash,
        confirmpassword: passwordHash,
      });

      console.log(newUser);
      const saveUser = await newUser.save();

      console.log(saveUser);

      return res.status(200).json({  newUser, message: "Register succusfully!"  });

      //res.status(200).json({ msg: "Register succusfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  userlogin: async (req, res) => {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(200)
          .json({ error: "please fill email and password" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ error: "This email does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || !email) {
        return res.status(200).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY
      );

     return res.status(200).json({ token, user, message: "Login success!"  });
      
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = userCntrl;
