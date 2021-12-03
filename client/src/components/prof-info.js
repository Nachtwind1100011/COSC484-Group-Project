import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfDisplay(props) {
  const totalVotes = props.prof.likes + props.prof.dislikes;
  const rating =
    totalVotes === 0
      ? 0
      : Math.round((props.prof.likes / totalVotes) * 50) / 10;
  return (
    <div className='prof'>
      <div className='prof-info'>
        <div className='prof-info-name'>
          {props.prof.fname} {props.prof.lname}
        </div>
        <div className='prof-info-background'>
          <span>{props.prof.school}</span>
          <span>|</span>
          <span>
            {props.prof.department[0]}
            {props.prof.department.length > 1 &&
              ", " + props.prof.department[1]}
          </span>
        </div>

        <div className='prof-info-rating'>
          <div className='prof-info-score'>
            <span>{rating}</span>
            <span>•</span>
          </div>
          <div className='prof-info-likes'>
            <FontAwesomeIcon icon='thumbs-up' />
            <div>{props.prof.likes}</div>
            <FontAwesomeIcon icon='thumbs-down' />
            <div>{props.prof.dislikes}</div>
            <span>•</span>
          </div>
          <div className='prof-info-style'>
            <FontAwesomeIcon icon='chalkboard-teacher' />
            <div>{props.prof.lecture}</div>
            <FontAwesomeIcon icon='book' />
            <div>{props.prof.textbook}</div>
          </div>
        </div>
      </div>
      <div className='flex-div'></div>
      <div className='search-prof-icon'>
        {props.prof.lecture === 0 && props.prof.textbook === 0 ? (
          <FontAwesomeIcon icon='question' />
        ) : props.prof.lecture === props.prof.textbook ? (
          <FontAwesomeIcon icon='balance-scale' />
        ) : props.prof.lecture > props.prof.textbook ? (
          <FontAwesomeIcon icon='chalkboard-teacher' />
        ) : (
          <FontAwesomeIcon icon='book' />
        )}
      </div>
    </div>
  );
}

export default ProfDisplay;
