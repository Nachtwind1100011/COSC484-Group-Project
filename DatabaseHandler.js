const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

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

    async createUser(username, email, learningPreference, password) {
        const duplicate = await User.findOne({username: username})
        if(duplicate) {
            return {
                "Error": "username in uses"
            }
        }

        try {
            const hashedPass = await bcrypt.hash(password, 10);

            const result = await User.create({
                "username": username,
                "email": email,
                "learningPreference": learningPreference,
                "password": hashedPass
            });

            return result;

        } catch(error) {
            return {
                "Error": "Error creating user"
            }
        }
    }

    async getUser(username) {
        try {
            const user = await User.findOne({username: username});
            return user;
        } catch(error) {
            return {
                "Error": error
            }
        }
    }
}


module.exports = { DatabaseHandler };