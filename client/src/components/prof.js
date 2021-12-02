import React, { useState, useEffect } from "react";
import Nav from "./nav";
import { useSearchParams } from "react-router-dom";
import { Professors } from "./data";
import ProfDisplay from "./prof-info";

function Prof() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [prof, setProf] = useState(null);

  useEffect(() => {
    //get prof by id
    setProf(Professors.find((prof) => prof.id == id));
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
