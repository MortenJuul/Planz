// const mongoose = require("mongoose");
// mongoose.set("useFindAndModify", false);
// const User = mongoose.model("User");
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_URL


exports.loginSuccess = (req, res) => {
  if (req.user) {
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  else {
    res.status(401).json({
      success: false
    })
  }
};

exports.loginFailed = (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  })
};

exports.logout = (req, res) => {
  req.logout();
        res.redirect(CLIENT_URL);
};

exports.google = () => {
  passport.authenticate("google", { scope: ["profile"] })
};

exports.callback = () => {
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
};
// exports.createPost = (req, res) => {
//   const post = new Post({
//     title: req.body.title,
//     date: req.body.date,
//     location: req.body.location,
//     neighborhood: req.body.neighborhood,
//     description: req.body.description,
//   });
//   post
//     .save()
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Fail!",
//         error: err.message,
//       });
//     });
// };

// exports.getPost = (req, res) => {
//   Post.findById(req.params.id)
//     .select("-__v")
//     .then((post) => {
//       res.status(200).json(post);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Post not found with id " + req.params.id,
//           error: err,
//         });
//       }
//       return res.status(500).send({
//         message: "Error retrieving post with id " + req.params.id,
//         error: err.message,
//       });
//     });
// };

// exports.posts = (req, res) => {
//   Post.find()
//     .select("-__v")
//     .then((postInfos) => {
//       res.status(200).json(postInfos);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error!",
//         error: error,
//       });
//     });
// };

// exports.deletePost = (req, res) => {
//   Post.findByIdAndRemove(req.params.id)
//     .select("-__v-_id")
//     .then((post) => {
//       if (!post) {
//         res.status(404).json({
//           message: "No post found with id = " + res.params.id,
//           error: "404",
//         });
//       }
//       res.status(200).json({});
//     })
//     .catch((err) => {
//       return res.status(500).send({
//         message: "Error -> Can't delete post with id = " + req.params.id,
//         error: err.message,
//       });
//     });
// };

// exports.updatePost = (req, res) => {
//   Post.findByIdAndUpdate(
//     req.body._id,
//     {
//       title: req.body.title,
//       date: req.body.date,
//       location: req.body.location,
//       neighborhood: req.body.neighborhood,
//       description: req.body.description,
//     },
//     { new: false }
//   )
//     .select("-__v")
//     .then((post) => {
//       if (!post) {
//         res.status(404).send({
//           message: "Error => can't update an post with id = " + req.params.id,
//           error: "Not Found!",
//         });
//       }
//       res.status(200).json(post);
//     })
//     .catch((err) => {
//       return res.status(500).send({
//         message: "Error => can't update an post with id = " + req.params.id,
//         error: err.message,
//       });
//     });
// };