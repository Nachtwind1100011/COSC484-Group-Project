const mongoose = require('mongoose');


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
}

module.exports = { DatabaseHandler };