/*
    This is for the Professor model model use this for all schemas and jwt and mongo
*/

const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({ 
    fname: {
        type: String,
        required: [true, "add first name"]
    },
    lname: {
        type: String,
        required: [true, "add last name"]
    },
    school: {
        type: String,
        require: [true, "add school of employment"]
    },
    department: {
        type: Array,
        require: [true, "add department(s)"]
    },
    textbook: {
        type: Number,
    },
    lecture: {
        type: Number,
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    }
});

module.exports = mongoose.model("Professor", professorSchema);