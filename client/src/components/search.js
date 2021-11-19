import React, { useState } from "react";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Search() {
  const [searchMethod, setSearchMethod] = useState("Search By:");
  const [inputValue, setInputValue] = useState("");

  const selectStyle = {
    width: "170px",
    boxShadow: "none",
    font: "inherit",
    fontSize: "14px",
  };

  function handleChangeInput(event) {
    setInputValue(event.target.value);
  }
  function clearInput() {
    setInputValue("");
  }
  function handleChangeSearchMethod(event) {
    setSearchMethod(event.target.value);
  }
  function search(val) {
    console.log(val);
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      search(inputValue);
    }
  };

  return (
    <div>
      <Nav status='loggedIn' />
      <div className='search-content'>
        <div className='search-bar'>
          <div className='search-bar-icon'>
            <FontAwesomeIcon icon='search' />
          </div>
          <input
            type='text'
            onKeyDown={handleEnter}
            onChange={handleChangeInput}
            value={inputValue}
          />
          <div className='search-bar-icon right-icon' onClick={clearInput}>
            <FontAwesomeIcon icon='times-circle' />
          </div>
          <FormControl
            id='search-bar-select'
            variant='standard'
            sx={selectStyle}>
            <Select
              id='method'
              value={searchMethod}
              label='Search By'
              onChange={handleChangeSearchMethod}
              disableUnderline
              sx={selectStyle}>
              <MenuItem value={"Search By:"} sx={selectStyle}>
                Search By:
              </MenuItem>
              <MenuItem value={"lecture"} sx={selectStyle}>
                Lecture Focused
              </MenuItem>
              <MenuItem value={"textbook"} sx={selectStyle}>
                Textbook Heavy
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default Search;
