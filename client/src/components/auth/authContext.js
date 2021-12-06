/*
    This is how to access if the user is logged in
*/

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    async function getLoggedIn() {
      const loggedInRes = await axios.get("https://pick-my-professor.herokuapp.com/users/isLoggedIn", {withCredentials: true});
      setLoggedIn(loggedInRes.data);
    }

    //need for first time rendering
    useEffect(() => {
      getLoggedIn();
    }, []);
  
    return (
      <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>

        {props.children}
      </AuthContext.Provider>
    );
  }
  
  export default AuthContext;
  export { AuthContextProvider };