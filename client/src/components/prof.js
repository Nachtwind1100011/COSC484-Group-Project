import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { useSearchParams } from "react-router-dom";
import ProfDisplay from "./prof-info";
import axios from "axios";

function Prof() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [prof, setProf] = useState(null);

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:8080/professors/getProfessorByID/${id}`, {
        withCredentials: true,
      })
      .then((res) => setProf(res.data));
    //get comments by prof id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Nav status='loggedIn' />
      {prof && (
        <div id='prof-content'>
          <ProfDisplay prof={prof} />
        </div>
      )}
    </div>
  );
}

export default Prof;
