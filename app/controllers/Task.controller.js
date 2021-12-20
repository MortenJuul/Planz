const mongoose = require("mongoose");
const Task = require("../models/Task.model");
const moment = require("moment");

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
  console.log(req.query);
  let start = moment(req.query.date).startOf("day").toDate();
  let end = moment(start).endOf("day").toDate();
  await Task.find({ userId: req.query.userId, date: { $gte: start, $lt: end } })
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

exports.updateTask = (req, res) => {
  console.log("task to update: ", req.body);
  Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    complete: req.body.complete,
  })
    .select("-__v")
    .then((task) => {
      if (!task) {
        res.status(404).send({
          message: "Error => can't update an task with id = " + req.params.id,
          error: "Not Found!",
        });
      }
      res.status(200).json(task);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error => can't update an task with id = " + req.params.id,
        error: err.message,
      });
    });
};

exports.deleteTask = (req, res) => {
  Task.remove({_id: req.params.id})
    // .exec()
    .select("-__v-id")
    .then((task) => {
      if (!task) {
        res.status(404).json({
          message: "No task found with id = " + req.params.id,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error => can't delete task with id " + req.params.id,
        error: err.message,
      });
    });
};
