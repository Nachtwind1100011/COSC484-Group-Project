import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import axios from "axios";
import AuthContext from "./auth/authContext";
import { TextField, Button } from "@mui/material";
import { FormStyle } from "../styles";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("none");
  const { getLoggedIn } = useContext(AuthContext);
  let nav = useNavigate();

  async function tryLogin(e) {
    e.preventDefault();
    try {
      const login = await axios.post(
        "https://pick-my-professor.herokuapp.com/users/login",
        { username, password },
        { withCredentials: true }
      );

      //set the user object
      sessionStorage.setItem("user", JSON.stringify(login.data));

      await getLoggedIn(); //log in the user

      nav("/search");
    } catch (error) {
      setErrorDisplay("block");
    }
  }

  return (
    <div>
      <Nav status='login' />
      <div id='login-content' className='form'>
        <h1>Welcome Back</h1>
        <form onSubmit={tryLogin}>
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
            type='password'
            name='password'
            label='Password'
            variant='outlined'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={FormStyle}
          />
          <Button variant='contained' type='submit' sx={FormStyle}>
            Sign In
          </Button>
        </form>
        <span className='error' style={{ display: errorDisplay, color: "red" }}>
          Invalid username or password
        </span>
      </div>
    </div>
  );
}

export default Login;
