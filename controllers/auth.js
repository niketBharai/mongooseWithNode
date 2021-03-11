const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        msg: "Something Weird Happened",
        err,
      });
    }

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    });
    user
      .save()
      .then((response) => {
        res.json({
          response,
          msg: "User Added Successfully",
        });
      })
      .catch((err) => {
        res.json({
          msg: "Not Added",
          err,
        });
      });
  });
};

const login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({
              msg: "error occurred",
              err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "147qer", {
              expiresIn: "2h",
            });
            res.json({
              msg: "Login Successful",
              token,
            });
          } else {
            res.json({
              msg: "username or password does not matched",
            });
          }
        });
      } else {
        res.json({
          msg: "There are no such users",
        });
      }
    }
  );
};

module.exports = { register, login };
