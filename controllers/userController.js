const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const USER = require("../models/UserModel");

const userCntrl = {
  userregister: async (req, res) => {
    try {
      const { role, username, email, password, confirmpassword } = req.body;

      if (!username || !email || !password || !confirmpassword) {
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

      return res
        .status(200)
        .json({ newUser, message: "Register successfully!" });

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
          .status(400)
          .json({ error: "please fill email and password" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "This email does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || !email) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      //const data =

      return res.status(200).json({ token, user, message: "Login success!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateUserProfile: async (req, res) => {
    const user = await USER.findById(req.body.id);
    console.log("USER", user);

    if (user) {
      user.name = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      let updatedData = {
        username: req.body.name,
        email: req.body.email,
      };

      USER.findByIdAndUpdate(user._id, updatedData).then((resp) => {
        return res.json({
          message: "User updated successfully!",
        });
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  },

  updateUserProfilesetting: async (req, res) => {
    let user;
    try {
      let userID = req.body.id;
      USER.findById(userID).then(async (response) => {
        console.log(response);
        user = response;
        if (user) {
          user.name = req.body.username || user.username;
          user.email = req.body.email || user.email;

          console.log(req.body.password);
          console.log(user.password);

          bcrypt
            .compare(req.body.password, user.password)
            .then(async (match) => {
              if (match) {
                const passwordHash = await bcrypt.hash(
                  req.body.newpassword,
                  12
                );
                let updatedData = {
                  password: passwordHash,
                  confirmpassword: passwordHash,
                };

                USER.findByIdAndUpdate(user._id, updatedData).then((resp) => {
                  return res.json({
                    message: "Password reset successfully!",
                  });
                });
              } else {
                return res.json({
                  message: "Invalid current passsword!",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          res.status(404);
          throw new Error("User Not Found");
        }
      });
    } catch (error) {
      console.log("ERROR", error);
      res.status(400).json({ error: error });
    }
  },

  show: async (req, res) => {
    try {
      let usereID = req.params.id;
      USER.findById(usereID).then((response) => {
        res.json({
          response,
        });
      });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },
};

function validateEmail(email) {
  // const re =
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(email);
  console.log(validator.validate(email));
  if (validator.validate(email)) {
    return true;
  } else {
    return false;
  }
}

module.exports = userCntrl;
