import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { FormStyle } from "../styles";

function AddComment(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;
  const userId = user._id;
  const professorId = props.profId;

  const [comment, setComment] = useState("");

  async function sendComment(e) {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8080/comments/addComment",
        {
          userID: userId,
          professorID: professorId,
          username: username,
          comment: comment,
        },
        { withCredentials: true }
      );

      setComment("");
      props.addComment();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='add-comment-wrapper'>
      <form id='add-comment' onSubmit={sendComment}>
        <textarea
          required
          name='comment'
          placeholder='Share your thoughts...'
          rows='3'
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 350))}
        />
        <div id='add-comment-bottom'>
          <div id='add-comment-char-count'>{350 - comment.length}</div>
          <Button
            className='btn-small'
            variant='contained'
            type='submit'
            sx={FormStyle}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
