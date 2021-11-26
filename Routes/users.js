const express = require('express');
let router = express.Router();
const {DatabaseHandler} = require('../DatabaseHandler');
const jwt = require("jsonwebtoken");
const {Developer} = require('../developPass');
const SECRETE_KEY = process.env.SECRETE || Developer.Secrete_Key();


//the post request for creating a new user 
router.post("/createUser", async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let learningPreference = req.body.learningPreference;
    let password =  req.body.password;

    if (!username || !email || !learningPreference || !password) {
        return res.status(400).send("Error please fill out all fields");
    }

    let status = await DatabaseHandler.createUser(username, email, learningPreference, password);
    if(status == 201) {
        let user = await DatabaseHandler.getUser(username);
        
        //jwt sign user may not need to have in user model ask professor
        jwt.sign({user : user}, SECRETE_KEY, async (err, token) => {
            
            if(err) {
                return res.status(500).send("Token not made");
            }

            user.refreshToken = token;
           //await user.save();


            res.status(status).cookie("token", token, {httpOnly: true}).json(user);
        });
   
        
    } else {
        res.status(status).send("Error with creation status: " + status);
    }
});

//the post login route 
router.post("/login", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
  
    if(!username || !password) {
        return res.status(400).send("Error please fill out all fields");
    }

    let user = await DatabaseHandler.getUser(username);

//    console.log(user);
    if(user == null) {
        return res.status(500).send("Username not found");
    }

    let match = await DatabaseHandler.checkUserPassword(password, user.password);
    
    if(match) {
                //jwt sign user may not need to have in user model ask professor
        jwt.sign({user : user}, SECRETE_KEY, async (err, token) => {
           
            if(err) {
                return res.status(500).send("Token not made");
            }

            user.refreshToken = token;
            //await user.save();
            
            res.status(200).cookie("token", token, {httpOnly: true}).json(user);
        });

    } else {
        res.status(500).send("Error password not matched");
    }
});


//check to make sure the user is logged in
router.get('/isloggedIn', (req, res) => {
    const token = req.cookies.token;

    if(!token) {
        return res.send(false);
    }

   try {
    jwt.verify(token, SECRETE_KEY);

    return res.send(true);

   } catch(e) {

    return res.send(false);

   }
});

module.exports = router;