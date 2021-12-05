import React from "react";


function ProfessorComments(props) {
    const username = props.prof.username;
    const comment = props.prof.commentBody;
    const date = props.prof.date;



  return (
    <div>
        <span>{username}</span><br />
        <span>{comment}</span><br />
        <span>{date}</span>
        <br />
        <br />
    </div>
  );
}

export default ProfessorComments;