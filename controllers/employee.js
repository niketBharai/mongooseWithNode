const { response } = require("express");
const Employee = require("../models/employee");

// listing employees here

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: "Something weird happened",
      });
    });
};

const show = (req, res, next) => {
  let employeeId = req.body.employeeId;
  Employee.findById(employeeId)
    .then((response) => {
      res.json({
        response,
        msg: "show success",
      });
    })
    .catch((err) => {
      res.json({
        msg: "Err Occurred",
      });
    });
};

// for inserting
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    technology: req.body.technology,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  employee
    .save()
    .then((response) => {
      res.json({
        response,
        msg: "Employee added Successfully",
      });
    })
    .catch((err) => {
      res.json({
        msg: "inserting Failed",
        err,
      });
    });
};

//for updating
const update = (req, res, next) => {
  let employeeId = req.body.employeeId;

  let updatedData = {
    name: req.body.name,
    technology: req.body.technology,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeId, { $set: updatedData })
    .then((response) => {
      res.json({
        response,
        msg: "Updated Successfully",
      });
    })
    .catch((err) => {
      res.json({
        err,
        msg: "Update Failed",
      });
    });
};

// for deleting

const remove = (req, res, next) => {
  let employeeId = req.body.employeeId;
  Employee.findOneAndRemove(employeeId)
    .then((response) => {
      res.json({
        response,
        msg: "Deleted Successfully",
      });
    })
    .catch((err) => {
      res.json({
        msg: "Deletion Failed",
        err,
      });
    });
};

module.exports = { index, show, store, update, remove };
