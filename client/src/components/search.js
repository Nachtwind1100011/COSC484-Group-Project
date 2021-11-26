import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Professors, Schools } from "./data";
import Fuse from "fuse.js";
import SelectForm from "./select";
import Button from "@mui/material/Button";

function Search() {
  // next search denotes next potential search
  // curr search denotes search on display
  const [nextSearchField, setNextSearchField] = useState("School");
  const [currSearch, setCurrSearch] = useState({
    value: "",
    option: "",
    method: "",
  });
  const [res, setRes] = useState(Professors);
  const [displayRes, setDisplayRes] = useState([]);
  const [depts, setDepts] = useState([]);
  const searchOptions = ["School", "Professor"];
  const sortingOptions = ["Learning Preference", "Alphabetical"];
  const userPreference = "Lecture Focused";

  const selectSearchFieldStyle = {
    width: "100px",
    boxShadow: "none",
    font: "inherit",
    fontSize: "14px",
  };
  const selectFilterSortStyle = {
    font: "inherit",
    fontSize: "12px",
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  };

  function handleChangeSearchField(value) {
    setNextSearchField(value);
  }

  function onSelectTag(event, val) {
    if (event.type === "click" && event.target.id.includes("input")) {
      if (nextSearchField === "Professor")
        console.log("go to professor with id " + val.id);
      else {
        setCurrSearch({
          value: val,
          option: "School",
          method: "select",
        });
      }
    }
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      const input = event.target.value;
      if (!input) return;
      setCurrSearch({ value: input, option: nextSearchField, method: "Enter" });
    }
  };

  function handleChangeFilter(value) {
    if (value === "All Departments") setDisplayRes(res);
    else setDisplayRes(res.filter((prof) => prof.dept === value));
  }

  function handleChangeSort(value) {
    function alphaSort(a, b) {
      if (a.lname === b.lname) {
        if (a.fname < b.fname) return -1;
        else if (a.fname > b.fname) return 1;
      } else {
        if (a.lname < b.lname) return -1;
        else if (a.lname > b.lname) return 1;
      }
      return 0;
    }

    if (value === "Alphabetical")
      setDisplayRes(displayRes.slice(0).sort(alphaSort));
    else
      setDisplayRes(
        displayRes.slice(0).sort((a, b) => {
          if (
            (a.teachingStyle === userPreference) ===
            (b.teachingStyle === userPreference)
          )
            return alphaSort(a, b);
          else return a.teachingStyle === userPreference ? -1 : 1;
        })
      );
    console.log(displayRes);
  }

  useEffect(() => {
    if (!currSearch.value) return;
    if (currSearch.option === "School") {
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

  useEffect(() => {
    setDepts([...new Set(res.map((prof) => prof.dept))]);
    setDisplayRes(res);
  }, [res]);

  return (
    <div>
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
        {
          /* currSearch.field === "School" && currSearch.method === "select" &&  */
          <div className='search-university'>
            <FontAwesomeIcon icon='university' />
            <div>{currSearch.value}</div>
          </div>
        }
        <div className='search-res'>
          <div className='search-res-stat'>{res.length} professors found</div>
          <div className='flex-div'></div>
          <div className='filter-sort'>
            <SelectForm
              default='All Departments'
              variant='filled'
              sx={selectFilterSortStyle}
              selectSx={{
                ...selectFilterSortStyle,
                color: "white",
              }}
              class='filter-sort-select'
              handleChange={handleChangeFilter}
              items={["All Departments", ...depts]}
            />
            <div className='filter-sort-space'></div>
            <SelectForm
              default={sortingOptions[0]}
              variant='filled'
              sx={selectFilterSortStyle}
              selectSx={{
                ...selectFilterSortStyle,
                color: "white",
              }}
              class='filter-sort-select'
              handleChange={handleChangeSort}
              items={sortingOptions}
            />
          </div>
        </div>
        <div key={Math.random() + Date.now()}>
          {displayRes.map((prof) => (
            <Button variant='text' key={prof.id}>
              {prof.fname} {prof.lname}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
