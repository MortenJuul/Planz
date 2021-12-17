const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  date: [
      {
      start: Datetime, end: Datetime
      }
  ],
},{
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);