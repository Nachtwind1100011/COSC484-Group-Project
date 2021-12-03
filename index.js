/*
    This is for the end points use this for all api calls 
    if you want to use real in time rendering (Socket.IO please attached to seperate file)
*/
console.log(":::index.js line 5");
const express = require('express');
const { Logger } = require('./middleware/Logger');
const {DatabaseHandler} = require('./DatabaseHandler');
const {Developer} = require('./developPass');
const userRouter = require('./Routes/users');
//const { EventLogger } = require('./middleware/EventLogger');
console.log(":::index.js line 11");


//enviorment and development vars 
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGOURL || Developer.Mongo_Pass();
console.log(":::index.js line 17");

//app and db
let app = express();
console.log(":::index.js line 21");


//middleware 
app.use(express.static(__dirname + "/public")); //public render for html js css
console.log(":::index.js line 26");
//console.log(app.use(express.static(__dirname + "/public")));



app.use(Logger);
console.log(":::index.js line 32");
//console.log(app.use(Logger));



app.use(express.json()); // for json request
console.log(":::index.js line 38");
//console.log(app.use(express.json()));



app.use(express.urlencoded({extended:true})); // parsing 
console.log(":::index.js line 44");
//console.log(app.use(express.urlencoded({extended:true})));



//routing
app.use('/users', userRouter);
console.log(":::index.js line 51");
//console.log(app.use('/users', userRouter));



//console.log("passed /users");
//console.log(app.use('/users', userRouter));

//for the main page aka index testing 
app.get("/", (req, res, next) => {
    console.log(":::index.js line 61");

    //console.log("in root");
    return res.status(200).render("index");
});


app.listen(PORT, () => {
    console.log(":::index.js line 69");

    console.log(`Running server on port ${PORT}`);
    DatabaseHandler.startDatabase(MONGO_URL);
});