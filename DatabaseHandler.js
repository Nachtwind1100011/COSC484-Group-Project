const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const SALT_ROUNDS = 10;

class DatabaseHandler {
    constructor(url) {
        this.url = url;
    }

    //starting the database 
    async startDatabase() {
        try {

            await mongoose.connect(this.url);
            console.log("Database started");
            
        } catch (error) {
            console.log("Error connecting to the database");
        }
    }

    //create user for database
    async createUser(username, email, learningPreference, password) {
        const duplicate = await User.findOne({username: username});
        if(duplicate) {
            return 409;
        }

        try {
            let hashedPass = bcrypt.hashSync(password, SALT_ROUNDS);

            const result = await User.create({
                username: username,
                email: email,
                learningPreference: learningPreference,
                password: hashedPass
            });
            
            return 201;

        } catch(error) {
            console.log(error);
            return 400;
        }
    }

    //get a user from the data
    async getUser(username) {
        try {
            const user = await User.findOne({username: username});
            return user;
        } catch(error) {
            return {
                "Error": error
            };
        }
    }
}


module.exports = { DatabaseHandler };