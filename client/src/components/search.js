import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Professors, Schools } from "./data";
import Fuse from "fuse.js";

function Search() {
  // next search denotes next potential search
  // curr search denotes search on display
  const [nextSearchField, setNextSearchField] = useState("School");
  const [currSearch, setCurrSearch] = useState({
    value: "",
    field: "",
    method: "",
  });

  const selectStyle = {
    width: "100px",
    boxShadow: "none",
    font: "inherit",
    fontSize: "14px",
  };

  function handleChangeSearchMethod(event) {
    setNextSearchField(event.target.value);
  }

  function onSelectTag(event, val) {
    if (event.type === "click" && event.target.id.includes("input")) {
      if (nextSearchField === "Professor")
        console.log("go to professor with id " + val.id);
      else {
        setCurrSearch({
          value: val,
          field: "School",
          method: "select",
        });
      }
    }
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      const input = event.target.value;
      if (!input) return;
      setCurrSearch({ value: input, field: nextSearchField, method: "Enter" });
    }
  };

  useEffect(() => {
    if (!currSearch.value) return;
    if (currSearch.field === "School") {
      if (currSearch.method === "enter") {
        const fuse = new Fuse(Schools);
        const fuseRes = fuse.search(currSearch.value);
        const displayRes = fuseRes.map((res) => res.item);
        console.log(displayRes);
      } else {
        console.log("fetch professors for " + currSearch.value);
      }
    } else {
      const fuse = new Fuse(Professors, {
        keys: ["fname", "lname"],
      });
      const fuseRes = fuse.search(currSearch.value);
      const displayRes = fuseRes.map((res) => res.item);
      console.log(displayRes);
    }
  }, [currSearch]);

  return (
    <div>
      <Nav status='loggedIn' />
      <div className='search-content'>
        <div className='search-bar'>
          <FormControl
            id='search-bar-select'
            variant='standard'
            sx={selectStyle}>
            <Select
              id='method'
              value={nextSearchField}
              label='Search By'
              onChange={handleChangeSearchMethod}
              disableUnderline
              sx={selectStyle}>
              <MenuItem value={"School"} sx={selectStyle}>
                School
              </MenuItem>
              <MenuItem value={"Professor"} sx={selectStyle}>
                Professor
              </MenuItem>
            </Select>
          </FormControl>
          <div className='search-bar-icon left-icon'>
            <FontAwesomeIcon icon='search' />
          </div>
          <Autocomplete
            id='search-input'
            freeSolo
            options={
              nextSearchField === "School"
                ? Schools
                : Professors.map((option) => {
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
        {currSearch.field === "School" && currSearch.method === "select" && (
          <div className='search-university'>
            <FontAwesomeIcon icon='university' />
            <div>{currSearch.value}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
