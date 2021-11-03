/*
    This is for the end points use this for all api calls 
    if you want to use real in time rendering (Socket.IO please attached to seperate file)
*/
const express = require('express');
const { Logger } = require('./middleware/Logger');
const {DatabaseHandler} = require('./DatabaseHandler');
const {Mongo_Pass} = require('./developPass');

//enviorment and development vars 
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGOURL || Mongo_Pass();

//app and db
let app = express();
let database = new DatabaseHandler(MONGOURL);


//middleware 
app.use(express.json()); // for json request
app.use(express.urlencoded({extended:true})); // parsing 
app.use(express.static(__dirname + "/public")); //public render for html js css
app.use(Logger);



//for the main page aka index
app.get("/", (req, res, next) => {
    return res.status(200).send("Page working.");
});



app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
    database.startDatabase();
});