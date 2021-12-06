var fs = require('fs');

class ErrorHandler {
    static dataBaseError(err) {
        fs.appendFile('TestFile1.txt', 'testLine.', function (err) {
            if(err){
                throw err;
            } 
            console.log('Updated.')
        }); 
        fs.write(); 
        next();
    }

    static async dataBaseErrorTwo(thing) {
        // fs.open('TestFile1.txt', 'w', function (thing, file) {
        //     if (err) throw err;
        //     console.log('Saved!');
        //   });
        
          fs.appendFile('TestFile1.txt', thing + "\n", function (err) {
            if(err){
                throw err;
            } 
            console.log('Updated.')
        });  

         fs.write(); 

        // fs.close();
        
       //return;
        next();
        
    }
    

} 

module.exports = {ErrorHandler}; 
