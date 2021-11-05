/*
    This is for the Professor model model use this for all schemas and jwt and mongo
*/

const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({ 
    profesorName: {
        type: String,
        required: [true, "add professor name"]
    },
    teachingStyle: {
        type: String,
        require: [true, "add teaching style"]
    },
    likes: {
        type: Number
    },
    dislike: {
        type: Number
    }
});

module.exports = mongoose.model("Professor", professorSchema);