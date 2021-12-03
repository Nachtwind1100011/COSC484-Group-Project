/*
    add user comments
*/
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ 
    userID: {
        type: mongoose.Types.ObjectId,
        required: [true, "must provide userus"]
    }, 
    date: {
        type: Date,
        require: [true, "must provide date"]
    },

    commentBody: {
        type: String,
        required: [true, "must provide comment"]
    }
});

module.exports = mongoose.model("Comment", commentSchema);
