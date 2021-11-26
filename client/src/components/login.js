import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "./nav";
import axios from 'axios';
import AuthContext from "./auth/authContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {getLoggedIn} = useContext(AuthContext);
  let nav = useNavigate();


  async function tryLogin(e) {
    e.preventDefault();
    const login = await axios.post("http://localhost:8080/users/login", {username, password}, {withCredentials: true});
    sessionStorage.setItem("user", login.data);
    await getLoggedIn();
    nav("/search");
  }

  return (
    <div>
      <Nav status='login' />
      <form onSubmit={tryLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
        <label htmlFor="password">Password:</label>
        <input name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
