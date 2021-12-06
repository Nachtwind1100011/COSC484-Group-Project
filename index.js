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

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://pick-my-professor.herokuapp.com'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))


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



const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
    DatabaseHandler.startDatabase(MONGO_URL);
});