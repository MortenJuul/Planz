const mongoose = require("mongoose");
const Task = mongoose.model("../models/Task.model");

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
    // {userId: req.params.userId, date: req.params.date}
    await Task.find()
      .select("-__v")
      .then((tasks) => {
        res.status(200).json(tasks);
      })
      .catch((error) => {
        console.log(err);
        res.status(500).json({
          message: "Error",
          error: error,
        });
      });
  };
