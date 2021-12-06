import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import SelectForm from "./select";
import ProfDisplay from "./prof-info";
import SchoolDisplay from "./search-school";
import { Link } from "react-router-dom";
import { Context } from "./search";
import axios from "axios";

function SearchRes() {
  const { field } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const name = decodeURIComponent(params.get("name"));
  const select = params.get("select");
  const [res, setRes] = useState([]); // result from search
  const [displayRes, setDisplayRes] = useState([]); // filtered result
  const [displaySchools, setDisplaySchools] = useState([]);
  const [depts, setDepts] = useState([]);
  const [sortVal, setSortVal] = useState("Learning Preference");
  const [isLoading, setIsLoading] = useState(true);
  const sortingOptions = ["Learning Preference", "Alphabetical"];
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userPreference = user.learningPreference;
  const props = React.useContext(Context);
  const [professors, setProfessors] = useState(props.professors);
  const [schools, setSchools] = useState(props.schools);
  const [filterKey, setFilterKey] = useState(1);
  const [sortKey, setSortKey] = useState(2);

  const selectFilterSortStyle = {
    font: "inherit",
    // fontSize: "12px",
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  };

  useEffect(() => {
    if ((field !== "prof" && field !== "sch") || !name) navigate("/search");
    if (professors.length === 0) {
      axios
        .get("http://localhost:8080/professors/allProfessors", {
          withCredentials: true,
        })
        .then((res) => setProfessors(res.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (schools.length === 0)
      setSchools([...new Set(professors.map((prof) => prof.school))]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professors]);

  useEffect(() => {
    setRes([]);
    setDisplayRes([]);
    setDisplaySchools([]);
    if (field === "prof") {
      // fuse or req?
      const fuse = new Fuse(professors, {
        keys: ["fname", "lname"],
      });
      const fuseRes = fuse.search(name);
      setRes(fuseRes.map((res) => res.item));
    } else {
      if (select === "false") {
        const fuse = new Fuse(schools);
        const fuseRes = fuse.search(name);
        setDisplaySchools(fuseRes.map((res) => res.item));
        setIsLoading(false);
      } else {
        // req to get all prof for school
        setRes(professors.filter((prof) => prof.school === name));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professors, field, params, select]);

  useEffect(() => {
    setFilterKey(new Date().getTime());
    setSortKey(new Date().getTime() + 1);

    let tempDepts = [];
    res.forEach((prof) => tempDepts.push(...prof.department));
    setDepts([...new Set(tempDepts)]);
    setDisplayRes(res);
    setIsLoading(false);
  }, [res]);

  function handleChangeFilter(value) {
    if (value === "All Departments") return res;
    else return res.filter((prof) => prof.dept.includes(value));
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
          // push unrated to bottom
          (a.textbook === 0 &&
            a.lecture === 0 &&
            (b.textbook !== 0 || b.lecture !== 0)) ||
          ((a.textbook !== 0 || a.lecture !== 0) &&
            b.textbook === 0 &&
            b.lecture === 0)
        )
          return b.textbook === 0 && b.lecture === 0 ? -1 : 1;
        else if (
          ((a.textbook > a.lecture ? "Textbook" : "Lecture") ===
            userPreference) ===
          ((b.textbook > b.lecture ? "Textbook" : "Lecture") === userPreference)
        )
          return alphaSort(a, b);
        else if (a.textbook === a.lecture)
          return (b.textbook > b.lecture ? "Textbook" : "Lecture") ===
            userPreference
            ? 1
            : -1;
        else
          return (a.textbook > a.lecture ? "Textbook" : "Lecture") ===
            userPreference
            ? -1
            : 1;
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
    navigate(`/search/sch?name=${school}`);
  }

  return isLoading ? (
    <div></div>
  ) : field === "sch" && select === "false" ? (
    <div id='search-res-schools'>
      <div className='center-text'>
        {displaySchools.length} school(s) found matching '{name}'
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
      {field === "sch" && (
        <div className='search-res-university'>
          <FontAwesomeIcon icon='university' />
          <div>{name}</div>
        </div>
      )}
      <div className='search-res-filter-sort'>
        <div className='search-res-stat'>
          {res.length} professor(s) found matching '{name}'
        </div>
        <div className='flex-div'></div>
        {res.length > 1 && (
          <div className='filter-sort'>
            <SelectForm
              key={filterKey}
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
              key={sortKey}
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
            to={`/professors?id=${prof._id}`}
            className='search-res-link'
            key={prof._id}>
            <ProfDisplay prof={prof} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchRes;
