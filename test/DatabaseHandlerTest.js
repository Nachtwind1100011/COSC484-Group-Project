//testing for database
console.log("::::DatabaseHandlerTest.js line 2");

const {DatabaseHandler} = require('../DatabaseHandler');
const bcrypt = require('bcrypt');
const User = require('../models/User');
let expect = require('chai').expect;

//this is the development password
const { Mongo_Pass } = require('../developPass');

const MONGOURL = process.env.MONGOURL || Mongo_Pass();

describe("DatabaseHandler", async () => {
    before(async () => {
        const pass = 'testpassword';
        const hashedPass = await bcrypt.hash(pass, 10);
        this.user = {
            username: 'jimmy12',
            email: 'jimmy12@gmail.com',
            learningPreference: 'textbook',
            password: pass,
            hashedPass: hashedPass
        }
        this.dbHandler = new DatabaseHandler(MONGOURL);
        await this.dbHandler.startDatabase();
    });

    after(async () => {
        await User.deleteOne({username: this.user.username});
    });

    it('DatabaseHandler createUser should return new user',async () => {
        const newUser = await this.dbHandler.createUser(this.user.username, this.user.email, this.user.learningPreference, this.user.password);
    });

    it('DatabaseHandler should find a user', async () => {
        const user = await this.dbHandler.getUser(this.user.username);
    });
});