const mongoose = require("mongoose");
const Task = require('../models/Task.model');
const moment = require('moment')

exports.createTask = async (req, res) => {
  const task = new Task({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  });
  await task
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail!",
        error: err.message,
      });
    });
};

exports.getTasks = async (req, res) => {
  console.log(req.query)
  let start = moment(req.query.date).startOf('day').toDate()
  let end = moment(start).endOf('day').toDate()
    await Task.find({userId: req.query.userId, date: {$gte: start, $lt: end}})
      .select("-__v")
      .then((tasks) => {
        res.status(200).json(tasks);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error",
          error: err,
        });
      });
  };
