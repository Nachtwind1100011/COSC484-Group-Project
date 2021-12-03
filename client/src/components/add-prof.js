import React, { useState, useEffect } from "react";
import Nav from "./nav";
import axios from "axios";
import { TextField, Button, Autocomplete } from "@mui/material";
import { FormStyle } from "../styles";

function AddProf() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [school, setSchool] = useState("");
  const [dept1, setDept1] = useState("");
  const [dept2, setDept2] = useState("");
  const [schools, setSchools] = useState([]);
  const [successDisplay, setSuccessDisplay] = useState("none");
  const [errorDisplay, setErrorDisplay] = useState("none");
  const [professors, setProfessors] = useState([]);
  const [depts, setDepts] = useState([]);
  const [key1, setKey1] = useState(1);
  const [key2, setKey2] = useState(2);
  const [key3, setKey3] = useState(3);

  useEffect(() => {
    axios
      .get("http://localhost:8080/professors/allProfessors", {
        withCredentials: true,
      })
      .then((res) => setProfessors(res.data));
  }, []);

  useEffect(() => {
    setSchools([...new Set(professors.map((prof) => prof.school))]);
  }, [professors]);

  useEffect(() => {
    let tempDepts = [];
    professors
      .filter((professor) => professor.school === school)
      .forEach((prof) => tempDepts.push(...prof.department));
    setDepts([...new Set(tempDepts)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [school]);

  function handleChangeSchool(e) {
    setSchool(e.target.value);
  }

  async function addProf(e) {
    e.preventDefault();
    setSuccessDisplay("none");
    setErrorDisplay("none");
    const body = {
      fname: fname,
      lname: lname,
      school: school,
      department: dept2 ? [dept1, dept2] : dept1,
    };
    try {
      await axios.post(
        "http://localhost:8080/professors/createProfessor",
        body,
        { withCredentials: true }
      );
      setFName("");
      setLName("");
      setKey1(new Date().getTime());
      setKey2(new Date().getTime() + 1);
      setKey3(new Date().getTime() + 2);
      setSuccessDisplay("block");
    } catch (error) {
      setErrorDisplay("block");
    }
  }
  return (
    <div>
      <Nav status='loggedIn' />
      <div id='add-content' className='form'>
        <h1>Add Professor</h1>
        <form onSubmit={addProf}>
          <TextField
            required
            name='fname'
            label='First Name'
            variant='outlined'
            onChange={(e) => setFName(e.target.value)}
            value={fname}
            sx={FormStyle}
          />
          <TextField
            required
            name='lname'
            label='Last Name'
            variant='outlined'
            onChange={(e) => setLName(e.target.value)}
            value={lname}
            sx={FormStyle}
          />
          <Autocomplete
            id='add-prof-school'
            key={key1}
            freeSolo
            options={schools.map((school) => ({ label: school }))}
            onChange={handleChangeSchool}
            onBlur={handleChangeSchool}
            renderInput={(params) => (
              <TextField {...params} label='School' required />
            )}
          />
          <Autocomplete
            id='add-prof-dept'
            key={key2}
            freeSolo
            options={depts.map((dept) => ({ label: dept }))}
            onChange={(e) => setDept1(e.target.value)}
            onBlur={(e) => setDept1(e.target.value)}
            renderInput={(params) => (
              <TextField {...params} label='1st Department' required />
            )}
          />
          <Autocomplete
            id='add-prof-dept2'
            key={key3}
            freeSolo
            options={depts.map((dept) => ({ label: dept }))}
            onChange={(e) => setDept2(e.target.value)}
            onBlur={(e) => setDept2(e.target.value)}
            renderInput={(params) => (
              <TextField {...params} label='2nd Department' />
            )}
          />
          <Button variant='contained' type='submit' sx={FormStyle}>
            Submit
          </Button>
        </form>
        <span
          className='success'
          style={{ display: successDisplay, color: "green" }}>
          Professor successfully added
        </span>
        <span className='error' style={{ display: errorDisplay, color: "red" }}>
          Oops! Something went wrong
        </span>
      </div>
    </div>
  );
}

export default AddProf;
