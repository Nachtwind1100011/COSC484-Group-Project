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
  const [errorDisplay, setErrorDisplay] = useState("none");

  const {getLoggedIn} = useContext(AuthContext);
  let nav = useNavigate();

  const divStyle = {
    textAlign: "Center",
    flexWrap: "wrap",
    alignContent: "center"
  };

  const formStyle = {
    textAlign:"center"
  }


  async function trySignup(e) {
    e.preventDefault();
    if(password !== confirmPass) {
      alert("Passwords do not match");
    } else {

      try {

        const login = await axios.post("http://localhost:8080/users/createUser", {username, email, learningPreference, password}, {withCredentials: true});
        sessionStorage.setItem("user", JSON.stringify(login.data))
        await getLoggedIn();
        nav("/search");

      } catch(error) {

        setErrorDisplay("block");

      }
    }
  }

  return (
    <div style={divStyle}>
      <Nav status='login' />
      <h1>SignUp!</h1>
      <form onSubmit={trySignup} style={formStyle}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} required />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required /><br/><br/>

        <label>Learning Preference:</label>
        <select onChange={((e) => setLearningPref(e.target.value))}> 
          <option value="Textbook">TextBook</option>
          <option value="Lecture">Lecture</option>
        </select>

        <br/><br/>
        
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        <label htmlFor="cPassword">Confirm Password:</label>
        <input type="password" name="cPassword" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} required /><br/><br/>
        <input type="submit" value="Submit" />
      </form>
      <span className="error" style={{display: errorDisplay, color: 'red'}}>That Username is Taken. Please try Another.</span>
    </div>
  );
}

export default SignUp;
