import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import axios from "axios";
import AuthContext from "./auth/authContext";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FormStyle } from "../styles";

const learningPreferences = ["Textbook", "Lecture"];

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [learningPreference, setLearningPref] = useState("Textbook");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("none");

  const { getLoggedIn } = useContext(AuthContext);
  let nav = useNavigate();

  const formStyle = {
    textAlign: "center",
  };

  async function trySignup(e) {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match");
    } else {
      try {
        const login = await axios.post(
          "http://localhost:8080/users/createUser",
          { username, email, learningPreference, password },
          { withCredentials: true }
        );
        sessionStorage.setItem("user", JSON.stringify(login.data));
        await getLoggedIn();
        nav("/search");
      } catch (error) {
        setErrorDisplay("block");
      }
    }
  }

  return (
    <div>
      <Nav />
      <div id='signup-content' className='form'>
        <h1>Create Account</h1>
        <form onSubmit={trySignup}>
          <TextField
            required
            name='username'
            label='Username'
            variant='outlined'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            sx={FormStyle}
          />
          <TextField
            required
            type='email'
            name='email'
            label='Email'
            variant='outlined'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={FormStyle}
          />
          <FormControl>
            <InputLabel id='learning-pref-label'>
              Learning Preference
            </InputLabel>
            <Select
              labelId='learning-pref-label'
              label='Learning Preference'
              value={learningPreference}
              onChange={(e) => setLearningPref(e.target.value)}
              // disableUnderline
              sx={FormStyle}>
              {learningPreferences.map((item) => (
                <MenuItem key={item} value={item} sx={formStyle}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            type='password'
            name='password'
            label='Password'
            variant='outlined'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={FormStyle}
          />
          <TextField
            required
            type='password'
            name='cPassword'
            label='Confirm Password'
            variant='outlined'
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            sx={FormStyle}
          />
          <Button variant='contained' type='submit' sx={FormStyle}>
            Sign Up
          </Button>
        </form>
        <span className='error' style={{ display: errorDisplay, color: "red" }}>
          The username is taken. Please try another.
        </span>
      </div>
    </div>
  );
}

export default SignUp;
