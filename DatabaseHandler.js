const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Professor = require('./models/Professor');
const Comment = require('./models/comments');
const SALT_ROUNDS = 10;

class DatabaseHandler {

    //starting the database 
    static async startDatabase(url) {
        try {

            await mongoose.connect(url);
            console.log("Database started");
            
        } catch (error) {
            console.log("Error connecting to the database");
        }
    }

    //create user for database
    static async createUser(username, email, learningPreference, password) {
        const duplicate = await User.findOne({username: username});
        if(duplicate) {
            return 400;
        }

        try {
            let hashedPass = bcrypt.hashSync(password, SALT_ROUNDS);

            const result = await User.create({
                username: username,
                email: email,
                learningPreference: learningPreference,
                password: hashedPass
            });
            
            return 200;

        } catch(error) {
            console.log(error);
            return 400;
        }
    }

    //get a user from the data
    static async getUser(username) {
        try {
            const user = await User.findOne({username: username});
            return user;
        } catch(error) {
            return null;
        }
    }

    static async checkUserPassword(password, hashedPassword) {
        let match = await bcrypt.compare(password, hashedPassword);
        return match;
    }

    //create professor for database
    static async createProfessor(fname, lname, school, department, ) {
        const duplicate = await Professor.findOne({fname: fname, lname: lname, school: school, department: department});
        if (duplicate) {
            return 400;
        }

        try {

            const result = await Professor.create({
                fname: fname,
                lname: lname,
                school: school,
                department: department
            });
            
            return 200;

        } catch(error) {
            console.log(error);
            return 400;
        }
    }

    static async getAllProfessors() {
        try {
            const allProfessors = await Professor.find({});
             return allProfessors;
        } catch(error) {
            console.log("Error getting all professors");
        }
    }

    static async getProfessorByID(id) {
        try {
            const professor = await Professor.findById(id);
            return professor;
        } catch(error) {
            console.log(error);
        }
    }


    //adding new comments 
    static async addComment(userid, professorid, username, date, comment) {
        try {
            const result = await Comment.create({
                userID: userid,
                professorID: professorid,
                username: username,
                date: date,
                commentBody: comment
            });
            return 200;
        } catch(error) {
            console.log(error);
            return 500;
        }
    }
}


module.exports = { DatabaseHandler };