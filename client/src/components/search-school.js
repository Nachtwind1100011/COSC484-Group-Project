import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SchoolDisplay(props) {
  return (
    <div
      key={props.school}
      className='search-res-school'
      onClick={() => props.handleClick(props.school)}>
      <FontAwesomeIcon icon='university' />
      <div>{props.school}</div>
    </div>
  );
}

export default SchoolDisplay;
