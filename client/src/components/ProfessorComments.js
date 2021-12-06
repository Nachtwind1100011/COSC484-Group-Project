import React from "react";

function ProfessorComments(props) {
  const username = props.prof.username;
  const comment = props.prof.commentBody;
  const date = props.prof.date;

  return (
    <div className='comment'>
      <div className='comment-top'>
        <span>{username}</span>
        <span>{date}</span>
      </div>
      <div>{comment}</div>
    </div>
  );
}

export default ProfessorComments;
