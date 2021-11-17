import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProf from "./components/add-prof";
import Login from "./components/login";
import Prof from "./components/prof";
import Search from "./components/search";
import SignUp from "./components/sign-up";
import Landing from "./components/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='professors/*' element={<Prof />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='search' element={<Search />} />
        <Route path='add' element={<AddProf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
