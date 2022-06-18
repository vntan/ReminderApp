var db = require('./connectDB')

var Users ={
    getAllUsers: function(callback){
        return db.query("Select * from account", callback);
    }

}

module.exports = Users