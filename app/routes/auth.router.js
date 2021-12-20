const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_URL

module.exports = function (app) {
    // var auth = require("../controllers/auth.controller.js");
    // var user = require("../controllers/user.controller.js");
    var task = require("../controllers/Task.controller.js");
  
    app.post("/task/post", task.createTask);
    // app.get("/api/post/:id", posts.getPost);
    app.get("/tasks", task.getTasks);
    // app.put("/api/post", posts.updatePost);
    // app.delete("/api/post/:id", posts.deletePost);

    // app.get("/auth/login/success", auth.loginSuccess);
    // app.get("/login/failed", auth.loginFailed);
    // app.get("/logout", auth.logout);
    // app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
    // app.get("auth/google/callback", auth.callback);
    // app.get("/login/success", (req, res) => {
    //     if (req.user) {
    //       res.status(200).json({
    //         success: true,
    //         message: "successful",
    //         user: req.user,
    //         //   cookies: req.cookies
    //       });
    //     }
    //   });
      
      // app.get("/auth/login/failed", (req, res) => {
      //   res.status(401).json({
      //     success: false,
      //     message: "failure",
      //   });
      // });
      
      // app.get("/auth/logout", (req, res) => {
      //   req.logout();
      //   res.redirect(CLIENT_URL);
      // });
      
      // app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
      
      // app.get(
      //   "/auth/google/callback",
      //   passport.authenticate("google", {
      //     successRedirect: CLIENT_URL,
      //     failureRedirect: "/login/failed",
      //   })
      // );
  };