/*
    This is for the end points use this for all api calls 
*/
const express = require('express');
const { Logger } = require('./middleware/Logger');
const PORT = process.env.PORT || 3000;

let app = express();

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
});