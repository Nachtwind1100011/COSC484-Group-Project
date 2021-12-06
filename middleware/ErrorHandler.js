var fs = require('fs');

class ErrorHandler {
    static async errorPassError(err) {
        fs.appendFile('ErrorFile.txt', err + "\n", function (err) {
            if(err){
                throw err;
            } 
            console.log('ErrorHandler.')
        }); 

        fs.write(); 
        next();
    }

    static async errorPassString(thing) {
          fs.appendFile('ErrorFile.txt', thing + "\n", function (err) {
            if(err){
                throw err;
            } 
            console.log('ErrorHandler.')
        });  

         fs.write(); 
        next();   
    }
} 

module.exports = {ErrorHandler}; 
