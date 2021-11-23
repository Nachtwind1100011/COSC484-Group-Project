//testing for database
const {DatabaseHandler} = require('../DatabaseHandler');
const bcrypt = require('bcrypt');
const User = require('../models/User');
let expect = require('chai').expect;

//this is the development password
const { Developer } = require('../developPass');

const MONGOURL = process.env.MONGOURL || Developer.Mongo_Pass();

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
        await DatabaseHandler.startDatabase(MONGOURL);
    });

    after(async () => {
        await User.deleteOne({username: this.user.username});
    });

    it('DatabaseHandler createUser should return new user',async () => {
        const newUser = await DatabaseHandler.createUser(this.user.username, this.user.email, this.user.learningPreference, this.user.password);
        return true;
    });

    it('DatabaseHandler should find a user', async () => {
        const user = await DatabaseHandler.getUser(this.user.username);
        return true;
    });
});