const express = require("express")
const router = require("express").Router();
const passport = require("passport");
const { isUserAuthenticated } = require("./authMiddleware");

const CLIENT_URL = process.env.CLIENT_URL

router.get("/login/success", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});
// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successful",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
//   else {
//     res.status(401).json({
//       success: false
//     })
//   }
// });

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  // req.session = null;
  req.logout();
  delete req.session;
  // res.status(200).clearCookie('express:sess.sig');
  // req.session.destroy(function (err) {
  res.redirect(CLIENT_URL);
  // });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
  // ,
  // (req, res) => {
  //   console.log("User: ", req.user);
  // //   req.send("Thank you for logging in!");
  // }
);

module.exports = router