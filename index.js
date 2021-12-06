/*
    This is for the end points use this for all api calls 
    if you want to use real in time rendering (Socket.IO please attached to seperate file)
*/
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Logger } = require('./middleware/Logger');
const {DatabaseHandler} = require('./DatabaseHandler');
const userRouter = require('./Routes/users');
const profRouter = require('./Routes/professors');
const commentRouter = require('./Routes/comments');

//enviorment and development vars 
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGOURL;

//app and db
let app = express();

//allows cors and axios to make request 
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:3000"],
      //to allow cookies and other credentials from this origin...should see
      //200 ok in network tab and also should see in localhost now from
      //front end and backend having credentials true
      credentials: true,
    })
  );


//middleware 
app.use(express.static(__dirname + "/public")); //public render for html js css
app.use(Logger);
app.use(express.json()); // for json request
app.use(express.urlencoded({extended:true})); // parsing 
app.use(cookieParser());

//routing
app.use('/users', userRouter);
app.use('/professors', profRouter);
app.use('/comments', commentRouter);

//for the main page aka index testing 
app.get("/", (req, res, next) => {
    return res.status(200).render("index");
});


app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
    DatabaseHandler.startDatabase(MONGO_URL);
});