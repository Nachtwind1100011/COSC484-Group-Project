import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { useSearchParams } from "react-router-dom";
import ProfDisplay from "./prof-info";
import AddComment from "./addComment";
import ProfessorComments from "../ProfessorComments";
import axios from "axios";

function Prof() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [prof, setProf] = useState(null);
  const [profComments, setProfComments] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/professors/getProfessorByID/${id}`, {
        withCredentials: true,
      })
      .then((res) => setProf(res.data));
    //get comments by prof id
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //second axios for comments
    axios.get(`http://localhost:8080/comments/getProfessorComments/${id}`, {withCredentials: true})
      .then((res) => setProfComments(res.data));

  }, []);

  return (
    <div>
      <Nav status='loggedIn' />

      {prof && (
        <div id='prof-content'>
          <ProfDisplay prof={prof} />
        </div>
      )}

      <div>
        <AddComment profId={id} />
      </div>
      
      <div>
      { profComments.length > 0 ? 
       profComments.map((el, i) => {return <ProfessorComments prof={el} key={i} /> })

       : <h2>There are no comments for this professor.</h2>
      } 
      </div>
    </div>
  );
}

export default Prof;
