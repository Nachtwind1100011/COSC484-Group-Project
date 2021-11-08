/*
    This is for the user model use this for all schemas and jwt and mongo
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter username"]
    },
    email: {
        type: String,
    },
    learningPreference: {
        type: String,
        required: [true, "please enter learning preference"]
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);