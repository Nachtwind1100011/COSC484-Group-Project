import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "./nav";
import axios from 'axios';
import AuthContext from "./auth/authContext";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [learningPreference, setLearningPref] = useState("Textbook");
  const [confirmPass, setConfirmPass] = useState("");
  const {getLoggedIn} = useContext(AuthContext);
  let nav = useNavigate();


  async function trySignup(e) {
    e.preventDefault();
    if(password !== confirmPass) {
      alert("Passwords do not match");
    } else {
      const login = await axios.post("http://localhost:8080/users/createUser", {username, email, learningPreference, password}, {withCredentials: true});
      sessionStorage.setItem("user", login.data);
      await getLoggedIn();
      nav("/search");
    }
  }

  return (
    <div>
      <Nav status='login' />
      <form onSubmit={trySignup}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} required />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />

        <label>Learning Preference:</label>
        <select onChange={((e) => setLearningPref(e.target.value))}> 
          <option value="Textbook">TextBook</option>
          <option value="Lecture">Lecture</option>
        </select>
        
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        <label htmlFor="cPassword">Confirm Password:</label>
        <input type="password" name="cPassword" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} required />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SignUp;
