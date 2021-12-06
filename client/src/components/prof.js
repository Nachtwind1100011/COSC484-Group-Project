import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { useSearchParams } from "react-router-dom";
import ProfDisplay from "./prof-info";
import AddComment from "./addComment";
import ProfessorComments from "./ProfessorComments";
import axios from "axios";
import SelectForm from "./select";

const selectStyle = {
  font: "inherit",
  // fontSize: "12px",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
};

function Prof() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [prof, setProf] = useState(null);
  const [profComments, setProfComments] = useState([]);
  const [displayComments, setDisplayComments] = useState([]);
  const [sortPref, setSortPref] = useState("Newest First");

  function getComments() {
    axios
      .get(`http://localhost:8080/comments/getProfessorComments/${id}`, {
        withCredentials: true,
      })
      .then((res) =>
        setProfComments(
          res.data.map((comment) => {
            comment.date = new Date(comment.date);
            return comment;
          })
        )
      );
  }

  function sort() {
    if (sortPref === "Newest First")
      setDisplayComments(
        profComments.slice(0).sort((a, b) => (a.date < b.date ? 1 : -1))
      );
    else
      setDisplayComments(
        profComments.slice(0).sort((a, b) => (a.date < b.date ? -1 : 1))
      );
  }

  function handleChangeSort(id, value) {
    setSortPref(value);
  }

  useEffect(() => {
    sort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortPref]);

  useEffect(() => {
    sort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profComments]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/professors/getProfessorByID/${id}`, {
        withCredentials: true,
      })
      .then((res) => setProf(res.data));

    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='prof-page'>
      <Nav status='loggedIn' />

      {prof && (
        <div id='prof-content'>
          <ProfDisplay prof={prof} />
          <div id='comments-title'>Comments ({profComments.length})</div>
          <AddComment profId={id} addComment={getComments} />

          <div id='comments-posted'>
            <SelectForm
              // key={sortKey}
              id='sort-comments'
              default={"Newest First"}
              variant='filled'
              sx={selectStyle}
              selectSx={{
                ...selectStyle,
                color: "white",
              }}
              class='sort-comments'
              handleChange={handleChangeSort}
              items={["Newest First", "Oldest First"]}
            />
            {displayComments.map((el, i) => {
              return <ProfessorComments prof={el} key={i} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Prof;
