const express = require("express");
let router = express.Router();
const { DatabaseHandler } = require("../DatabaseHandler");
const jwt = require("jsonwebtoken");
const { Developer } = require("../developPass");
const SECRETE_KEY = process.env.SECRETE || Developer.Secrete_Key();

//the post request for creating a new professor
router.post("/createProfessor", async (req, res, next) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let school = req.body.school;
  let department = req.body.department;

  if (!fname || !lname || !school || !department) {
    return res.status(400).send("Error please fill out all fields");
  }

  let status = await DatabaseHandler.createProfessor(
    fname,
    lname,
    school,
    department
  );
  if (status == 201) {
    res.status(status).send("Professor successfully added");
  } else {
    res.status(status).send("Error with creation status: " + status);
  }
});


//get all proferssors from the route, each request is verified through the react/node verify request so no need for middleware
//verify request
router.get("/allProfessors", async (req, res) => {
  let professorJSON = await DatabaseHandler.getAllProfessors();
  if (professorJSON) {
    res.status(200).json(professorJSON);
  } else {
    res.status(500).send("Error sending all professors");
  }
});

router.get("/getProfessorByID/:id", async (req, res) => {
  const id = req.params.id;
  const professor = await DatabaseHandler.getProfessorByID(id);
  res.status(200).json(professor);
});




module.exports = router;
