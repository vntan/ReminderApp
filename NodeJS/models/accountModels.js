var db = require('./connectDB')

var account ={
    login: function(email, password, cb){
        return db.query("CALL login(?,?); ", [email, password], cb)
    },

    loginWithGoogle: function(user, cb){
        return db.query("CALL loginWithGoogle(?, ?, ?, ?); ", 
                    [user.name, user.email, user.password, user.urlImage], cb)
    },

    register: function(user, cb){
        return db.query("CALL register(?, ?, ?, ?); ",
                [user.name, user.email, user.password, user.urlImage], cb)
    },

    getUserInformation: function(email, cb){
        return db.query("select `idAccount`,`name`,`email`, `urlImage` from account where email like ?",  [email], cb)
    }

}

module.exports = account