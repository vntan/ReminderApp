var db = require('./connectDB')

var account ={
    // getAllUsers: function(cb){
    //     return db.query("Select * from account", cb);
    // }, 
    login: function(email, password, cb){
        return db.query("select `idAccount`,`name`,`email`, `urlImage` from account where email like ? and password = ?", [email, password], cb)
    },

    register: function(user, cb){
        return db.query("insert into account(name, email, password, urlImage)  value (?,?,?,?) ",
                [user.name, user.email, user.password, user.urlImage], cb)
    },

    checkUserExist: function(email, cb){
        return db.query("select count(*) as 'countUser' from account where email like ?",  [email], cb)
    },

    getUserInformation: function(email, cb){
        return db.query("select `idAccount`,`name`,`email`, `urlImage` from account where email like ?",  [email], cb)
    }

}

module.exports = account