/*
    This is for the end points use this for all api calls 
    if you want to use real in time rendering (Socket.IO please attached to seperate file)
*/
const express = require('express');
const { Logger } = require('./middleware/Logger');
const {DatabaseHandler} = require('./DatabaseHandler');
const {Developer} = require('./developPass');
const userRouter = require('./Routes/users');


//enviorment and development vars 
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGOURL || Developer.Mongo_Pass();

//app and db
let app = express();


//middleware 
app.use(express.static(__dirname + "/public")); //public render for html js css
app.use(Logger);
app.use(express.json()); // for json request
app.use(express.urlencoded({extended:true})); // parsing 

//routing
app.use('/users', userRouter);


//for the main page aka index testing 
app.get("/", (req, res, next) => {
    return res.status(200).render("index");
});


<<<<<<< HEAD
//the post request for creating a new user 
app.post("/createUser", async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let learningPreference = req.body.learningPreference;
    let password =  req.body.password;

    if (!username || !email || !learningPreference || !password) {
        return res.status(400).send("Error please fill out all fields");
    }

    let status = await database.createUser(username, email, learningPreference, password);
    if(status == 201) {
        let user = await database.getUser(username);
        
        //jwt sign user may not need to have in user model ask professor
        jwt.sign({user : user}, SECRETE_KEY, async (err, token) => {
            
            if(err) {
                return res.status(500).send("Token not made");
            }

            user.refreshToken = token;
           //await user.save();


            res.status(status).json(user);
        });
   
        
    } else {
        res.status(status).send("Error with creation status: " + status);
    }
});


//the post login route 
app.post("/login", async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if(!username || !password) {
        return res.status(400).send("Error please fill out all fields");
    }

    let user = await database.getUser(username);

    if(user == null) {
        return res.status(500).send("Username not found");
    }

    let match = await database.checkUserPassword(password, user.password);
    
    if(match) {
        //jwt sign user may not need to have in user model ask professor
        jwt.sign({user : user}, SECRETE_KEY, async (err, token) => {
           
            if(err) {
                return res.status(500).send("Token not made");
            }

            user.refreshToken = token;
            //await user.save();

            res.status(200).json(user);
        });

    } else {
        res.status(500).send("Error password not matched");
    }
});


=======
>>>>>>> ba09e1bb81815deca871a6aad817c04ac1c809e7


app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
    DatabaseHandler.startDatabase(MONGO_URL);
});