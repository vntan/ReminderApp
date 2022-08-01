var db = require('./connectDB')

var list ={
    showList: function(userID, cb){
        return db.query("call showList(?)", [userID], cb);

    }, 

    addListToProject: function(projectID, nameList, cb){
        return db.query("call addList(?, null, ?)", [projectID, nameList], cb);
    },
    
    addListToUser: function(userID, nameList, cb){
        return db.query("call addList(null, ?, ?)", [userID, nameList], cb);
    },

    deleteList: function(listID, cb){
        return db.query("call deleteList(?)", [listID], cb);
    },

    editList: function(listID, nameList, cb){
        return db.query("call editList(?, ?)", [listID, nameList], cb);
    },
}

module.exports = list