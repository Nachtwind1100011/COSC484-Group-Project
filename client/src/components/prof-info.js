import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function ProfDisplay(props) {
  const [prof, setProf] = useState(props.prof);
  const [likes, setLikes] = useState(prof.likes);
  const [dislikes, setDislikes] = useState(prof.dislikes);
  const [textbook, setTextbook] = useState(prof.textbook);
  const [lecture, setLecture] = useState(prof.lecture);
  const totalVotes = likes + dislikes;
  const rating =
    totalVotes === 0 ? 0 : Math.round((likes / totalVotes) * 50) / 10;

  function updateProf() {
    axios
      .get(
        `https://pick-my-professor.herokuapp.com/professors/getProfessorByID/${prof._id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setProf(res.data));
  }

  function vote(icon) {
    axios
      .get(
        `https://pick-my-professor.herokuapp.com/professors/addLike/${prof._id}/${icon}`,
        {
          withCredentials: true,
        }
      )
      .then(updateProf());
  }

  useEffect(() => {
    setLikes(prof.likes);
    setDislikes(prof.dislikes);
    setTextbook(prof.textbook);
    setLecture(prof.lecture);
  }, [prof]);

  return (
    <div className='prof'>
      <div className='prof-info'>
        <div className='prof-info-name'>
          {prof.fname} {prof.lname}
        </div>
        <div className='prof-info-background'>
          <span>{prof.school}</span>
          <span>|</span>
          <span>
            {prof.department[0]}
            {prof.department.length > 1 && ", " + prof.department[1]}
          </span>
        </div>

        <div className='prof-info-rating'>
          <div className='prof-info-score'>
            <span>{rating}</span>
            <span>•</span>
          </div>
          <div className='prof-info-likes'>
            <FontAwesomeIcon icon='thumbs-up' onClick={() => vote("like")} />

            <div>{likes}</div>
            <FontAwesomeIcon
              icon='thumbs-down'
              onClick={() => vote("dislike")}
            />
            <div>{dislikes}</div>
            <span>•</span>
          </div>
          <div className='prof-info-style'>
            <FontAwesomeIcon
              icon='chalkboard-teacher'
              onClick={() => vote("lecture")}
            />
            <div>{lecture}</div>
            <FontAwesomeIcon icon='book' onClick={() => vote("textbook")} />
            <div>{textbook}</div>
          </div>
        </div>
      </div>
      <div className='flex-div'></div>
      <div className='search-prof-icon'>
        {lecture === 0 && textbook === 0 ? (
          <FontAwesomeIcon icon='question' />
        ) : lecture === textbook ? (
          <FontAwesomeIcon icon='balance-scale' />
        ) : lecture > textbook ? (
          <FontAwesomeIcon icon='chalkboard-teacher' />
        ) : (
          <FontAwesomeIcon icon='book' />
        )}
      </div>
    </div>
  );
}

export default ProfDisplay;
