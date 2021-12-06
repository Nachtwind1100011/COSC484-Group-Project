/*
    add user comments
*/
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [true, "must provide userus"],
  },
  professorID: {
    type: String,
    required: [true, "Must provide professor ID"],
  },
  username: {
    type: String,
    required: [true, "must provide username"],
  },
  date: {
    type: Date,
    require: [true, "must provide date"],
  },

  commentBody: {
    type: String,
    required: [true, "must provide comment"],
  },
});

module.exports = mongoose.model("Comment", commentSchema);
