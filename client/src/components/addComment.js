import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
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

            console.log(`username ${username} userid ${userId} professorId ${professorId}`)

            const sentComment = await axios.post(
                "http://127.0.0.1:8080/comments/addComment",
                {userID: userId,
                 professorID: professorId,
                 username: username,
                 comment: comment},
                 {withCredentials: true}
            );

            setComment("");
        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h4>Add a Comment</h4>

            <form onSubmit={sendComment} >
            <TextField
            required
            type='text'
            name='comment'
            label='Add Comment'
            variant='outlined'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={FormStyle}
          />
          <Button variant='contained' type='submit' sx={FormStyle}>
            Add Comment
          </Button>

            </form>
        </div>
    );
}

export default AddComment;