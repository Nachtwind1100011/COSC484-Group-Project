import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, TextField } from "@mui/material";
import SelectForm from "./select";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

const Context = React.createContext({});

function Search() {
  // next search denotes next potential search
  // curr search denotes search on display
  const [nextSearchOption, setNextSearchOption] = useState("sch");
  const searchOptions = ["School", "Professor"];
  const [professors, setProfessors] = useState([]);
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  const selectSearchFieldStyle = {
    width: "100px",
    boxShadow: "none",
    font: "inherit",
    fontSize: "14px",
  };

  function handleChangeSearchField(id, value) {
    setNextSearchOption(value === "School" ? "sch" : "prof");
  }

  function onSelectTag(event, val) {
    if (event.type === "click" && event.target.id.includes("input")) {
      if (nextSearchOption === "sch") {
        navigate(`/search/sch?name=${val}`);
      } else navigate(`/professors?id=${val._id}`);
    }
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      const input = event.target.value;
      if (input)
        navigate(`/search/${nextSearchOption}?name=${input}&select=false`);
    }
  };

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

  return (
    <Context.Provider value={{ professors: professors, schools: schools }}>
      <Nav status='loggedIn' />
      <div className='search-content'>
        <div className='search-bar'>
          <SelectForm
            default='School'
            variant='standard'
            sx={selectSearchFieldStyle}
            id='search-bar-select'
            handleChange={handleChangeSearchField}
            items={searchOptions}
          />
          <div className='search-bar-icon left-icon'>
            <FontAwesomeIcon icon='search' />
          </div>
          <Autocomplete
            id='search-input'
            freeSolo
            options={
              nextSearchOption === "sch"
                ? schools
                : professors.map((option) => {
                    const modOption = {
                      ...option,
                      label: `${option.fname} ${option.lname}, ${option.school}`,
                    };
                    return modOption;
                  })
            }
            onChange={onSelectTag}
            onKeyDown={onEnter}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>

        <Outlet />
      </div>
    </Context.Provider>
  );
}

export default Search;

export { Context };
