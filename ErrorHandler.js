var fs = require('fs');

class ErrorHandler {
    static dataBaseError(err) {
        fs.appendFile('TestFile1', 'testLine.', function (err) {
            if(err){
                throw err;
            } 
            console.log('Updated.')
        }); 
        fs.write(); 
    }
} 