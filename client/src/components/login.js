import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "./nav";
import axios from 'axios';
import AuthContext from "./auth/authContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("none");
  const {getLoggedIn} = useContext(AuthContext);
  let nav = useNavigate();

  const centerStyle = {
    textAlign: 'center'
  }


  async function tryLogin(e) {
    e.preventDefault();
    try {
      const login = await axios.post("http://localhost:8080/users/login", {username, password}, {withCredentials: true});

      //set the user object
      sessionStorage.setItem("user", JSON.stringify(login.data));

      await getLoggedIn(); //log in the user

      nav("/search");
    } catch(error) {
      setErrorDisplay("block");
    }
  }

  return (
    <div style={centerStyle}>
      <Nav status='login' />
      <h1>Login</h1>
      <form onSubmit={tryLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} /> <br /> <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} /> <br /> <br />
        <input type="submit" value="Submit" />
      </form>
      <span className="error" style={{display: errorDisplay, color: 'red'}}>Invalid Username or password</span>
    </div>
  );
}

export default Login;
