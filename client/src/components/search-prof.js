import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ProfDisplay(props) {
  const rating =
    Math.round(
      (props.prof.likes / (props.prof.likes + props.prof.dislikes)) * 50
    ) / 10;
  return (
    <Link to={`/professors/${props.prof.id}`} className='search-prof'>
      <div className='prof-info'>
        <div className='prof-info-name'>
          {props.prof.fname} {props.prof.lname}
        </div>
        <div className='prof-info-background'>
          <span>{props.prof.school}</span>
          <span>|</span>
          <span>{props.prof.dept}</span>
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
        {props.prof.lecture > props.prof.textbook ? (
          <FontAwesomeIcon icon='chalkboard-teacher' />
        ) : (
          <FontAwesomeIcon icon='book' />
        )}
      </div>
    </Link>
  );
}

export default ProfDisplay;
