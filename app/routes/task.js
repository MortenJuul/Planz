const express = require("express")
const router = require("express").Router();
const passport = require("passport");
const { isUserAuthenticated } = require("./authMiddleware");

const CLIENT_URL = process.env.CLIENT_URL
const task = require("../controllers/Task.controller.js");

// router.get("/login/success", isUserAuthenticated, (req, res) => {
//   res.json(req.user);
// });

router.post("/post", task.createTask);
router.put("/post/:id", task.updateTask)
router.delete("/post/:id", task.deleteTask)
router.get("/", task.getTasks)

module.exports = router