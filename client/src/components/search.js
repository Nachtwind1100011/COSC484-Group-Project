import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Professors, Schools } from "./data";
import Fuse from "fuse.js";
import SelectForm from "./select";
import ProfDisplay from "./prof-info";
import { useNavigate } from "react-router-dom";
import SchoolDisplay from "./search-school";
import { Link } from "react-router-dom";

function Search() {
  // next search denotes next potential search
  // curr search denotes search on display
  const [nextSearchOption, setNextSearchOption] = useState("School");
  const [currSearch, setCurrSearch] = useState({
    value: "",
    option: "",
    method: "",
  });
  const [res, setRes] = useState(Professors); // result from search
  const [displayRes, setDisplayRes] = useState([]); // filtered result
  const [displaySchools, setDisplaySchools] = useState(Schools);
  const [depts, setDepts] = useState([]);
  const [sortVal, setSortVal] = useState("Learning Preference");
  const searchOptions = ["School", "Professor"];
  const sortingOptions = ["Learning Preference", "Alphabetical"];
  const navigate = useNavigate();
  const userPreference = "Textbook Heavy";

  const selectSearchFieldStyle = {
    width: "100px",
    boxShadow: "none",
    font: "inherit",
    fontSize: "14px",
  };
  const selectFilterSortStyle = {
    font: "inherit",
    // fontSize: "12px",
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  };

  function handleChangeSearchField(id, value) {
    setNextSearchOption(value);
  }

  function onSelectTag(event, val) {
    if (event.type === "click" && event.target.id.includes("input")) {
      if (nextSearchOption === "School") {
        setCurrSearch({
          value: val,
          option: "School",
          method: "select",
        });
      } else navigate(`/professors?id=${val.id}`);
    }
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      const input = event.target.value;
      if (!input) return;
      setCurrSearch({
        value: input,
        option: nextSearchOption,
        method: "Enter",
      });
    }
  };

  function handleChangeFilter(value) {
    if (value === "All Departments") return res;
    else return res.filter((prof) => prof.dept === value);
  }

  function handleChangeSort(arr, value) {
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

    if (value === "Alphabetical") arr = arr.slice(0).sort(alphaSort);
    else
      arr = arr.slice(0).sort((a, b) => {
        if (
          (a.teachingStyle === userPreference) ===
          (b.teachingStyle === userPreference)
        )
          return alphaSort(a, b);
        else return a.teachingStyle === userPreference ? -1 : 1;
      });
    return arr;
  }

  function handleChangeFilterSort(name, value) {
    // name is 'filter' or 'sort'
    if (name === "sort") {
      setSortVal(value);
      setDisplayRes(handleChangeSort(displayRes, value));
    } else {
      setDisplayRes(handleChangeSort(handleChangeFilter(value), sortVal));
    }
  }

  function handleClickSchool(school) {
    setCurrSearch({
      value: school,
      option: "School",
      method: "select",
    });
  }

  useEffect(() => {
    if (!currSearch.value) return;
    if (currSearch.option === "School") {
      if (currSearch.method === "Enter") {
        const fuse = new Fuse(Schools);
        const fuseRes = fuse.search(currSearch.value);
        setRes(fuseRes.map((res) => res.item));
      } else {
        setRes(
          Professors.filter(
            (professor) => professor.school === currSearch.value
          )
        );
      }
    } else {
      const fuse = new Fuse(Professors, {
        keys: ["fname", "lname"],
      });
      const fuseRes = fuse.search(currSearch.value);
      setRes(fuseRes.map((res) => res.item));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSearch]);

  useEffect(() => {
    if (currSearch.option === "School" && currSearch.method === "Enter")
      setDisplaySchools(res);
    else {
      setDepts([...new Set(res.map((prof) => prof.dept))]);
      setDisplayRes(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              nextSearchOption === "School"
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

        {!currSearch.value ? null : currSearch.option === "School" &&
          currSearch.method === "Enter" ? (
          <div id='search-res-schools'>
            <div className='center-text'>
              {displaySchools.length} school(s) found matching '
              {currSearch.value}'
            </div>
            {displaySchools.map((school) => (
              <SchoolDisplay
                key={school}
                school={school}
                handleClick={handleClickSchool}
              />
            ))}
          </div>
        ) : (
          <div className='search-res'>
            {currSearch.option === "School" && currSearch.method === "select" && (
              <div className='search-res-university'>
                <FontAwesomeIcon icon='university' />
                <div>{currSearch.value}</div>
              </div>
            )}
            <div className='search-res-filter-sort'>
              <div className='search-res-stat'>
                {res.length} professor(s) found matching '{currSearch.value}'
              </div>
              <div className='flex-div'></div>
              {displayRes.length > 1 && (
                <div className='filter-sort'>
                  <SelectForm
                    id='filter'
                    default='All Departments'
                    variant='filled'
                    sx={selectFilterSortStyle}
                    selectSx={{
                      ...selectFilterSortStyle,
                      color: "white",
                    }}
                    class='filter-sort-select'
                    handleChange={handleChangeFilterSort}
                    items={["All Departments", ...depts]}
                  />
                  <SelectForm
                    id='sort'
                    default={sortingOptions[0]}
                    variant='filled'
                    sx={selectFilterSortStyle}
                    selectSx={{
                      ...selectFilterSortStyle,
                      color: "white",
                    }}
                    class='filter-sort-select'
                    handleChange={handleChangeFilterSort}
                    items={sortingOptions}
                  />
                </div>
              )}
            </div>
            <div id='search-res-profs'>
              {displayRes.map((prof) => (
                <Link
                  to={`/professors?id=${prof.id}`}
                  className='search-res-link'
                  key={prof.id}>
                  <ProfDisplay prof={prof} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
