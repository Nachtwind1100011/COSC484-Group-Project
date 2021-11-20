import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddProf from "./components/add-prof";
import Login from "./components/login";
import Prof from "./components/prof";
import Search from "./components/search";
import SignUp from "./components/sign-up";
import Landing from "./components/landing";
import AuthContext from "./components/auth/authContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGraduationCap,
  faSearch,
  faTimesCircle,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  library.add(faGraduationCap, faSearch, faTimesCircle, faUniversity);
  const { loggedIn } = useContext(AuthContext);
  const testLoggedIn = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='professors/*' element={<Prof />} />
        <Route
          path='login'
          element={testLoggedIn ? <Navigate replace to='/search' /> : <Login />}
        />
        <Route
          path='signup'
          element={
            testLoggedIn ? <Navigate replace to='/search' /> : <SignUp />
          }
        />
        <Route path='search' element={<Search />} />
        <Route path='add' element={<AddProf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
