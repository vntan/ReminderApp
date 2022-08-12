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

    updateUserInformation: function(user, cb){
        return db.query("CALL updateAccountInformation(?,?,?,?)",
                [user.id, user.name, user.password, user.urlImage], cb)
    },

    deleteUser: function(userID, cb){
        return db.query("CALL deleteUser (?)", [userID], cb)
    },

    getUserID: function(email, cb){
        return db.query("CALL findUser (?)",  [email], cb)
    },

    updateUserPassword: function(email, password, cb){
        return db.query("CALL updateAccountPassword(?,?); ", [email, password], cb)
    }

    // getUserInformation: function(email, cb){
    //     return db.query("select `idAccount`,`name`,`email`, `urlImage` from account where email like ?",  [email], cb)
    // }

}

module.exports = account