const express = require("express");
let router = express.Router();
const { DatabaseHandler } = require("../DatabaseHandler");

//the post request for adding a comment
router.post("/addComment", async (req, res) => {
  let userid = req.body.userID;
  let professorID = req.body.professorID;
  let username = req.body.username;
  let commentBody = req.body.comment;

  if (!userid || !username || !commentBody) {
    return res.status(400).send("Error not all fields filled out");
  }

  let status = await DatabaseHandler.addComment(
    userid,
    professorID,
    username,
    Date.now(),
    commentBody
  );

  if (status == 200) {
    res.status(status).send("Comment Added");
  } else {
    res.status(status).send("Error comment not made");
  }
});

//get comments by professor's id
router.get("/getProfessorComments/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(4001).send("No professor id found");
  }

  const comments = await DatabaseHandler.getProfessorComments(id);
  return res.status(200).json(comments);
});

module.exports = router;
